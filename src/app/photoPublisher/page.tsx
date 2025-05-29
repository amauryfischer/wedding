"use client"
import Button from "@/ui/atoms/buttons/Button"
import React, { ChangeEvent, ChangeEventHandler } from "react";
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Page() {

    const [displayVideo, setDisplayVideo] = React.useState(false)
    const [photoPrise, setPhotoPrise] = React.useState(false)
    const videoElementRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const uploadImage = (data: Blob | null) => {
        const id = uuidv4();
        fetch(`https://72t1jvrie5.execute-api.eu-west-3.amazonaws.com/etape/manager/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "image/png",
                "unnomdifferent": "h^#E!S5/7%GLJg3w(9ctb*"
            },
            body: data
        }).then(() => {
            alert("Envoi réussi")
        })
    }

    const onfileSelection: ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files![0]
        uploadImage(file)
    }

    const takePhoto = () => {
        setPhotoPrise(false)
        console.log('takePhoto');
        setDisplayVideo(true)
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    facingMode: { ideal: "environment" },
                    width: { ideal: 9999 },
                    height: { ideal: 9999 }
                }, audio: false
            })
            .then((stream) => {
                if (videoElementRef.current !== null) {
                    videoElementRef.current!.srcObject = stream
                    videoElementRef.current!.play()
                }
            })
            .catch((err) => {
                console.error(`An error occurred: ${err}`)
            });
        canvasRef.current!.height = 0;
        canvasRef.current!.width = 0;
    }

    const sendPhoto = () => {
        const id = uuidv4();
        canvasRef.current?.toBlob((image) => {
            uploadImage(image)
            setPhotoPrise(false)
        })

    }

    const savePicture = () => {
        console.log('take picture')
        const width = videoElementRef.current!.videoWidth
        const height = videoElementRef.current!.videoHeight
        if (canvasRef.current) {
            canvasRef.current.width = width
            canvasRef.current.height = height;
        }
        const context = canvasRef.current?.getContext("2d")
        context?.drawImage(videoElementRef.current!, 0, 0, width, height)
        const data = canvasRef.current?.toDataURL("image/png")
        setDisplayVideo(false);
        setPhotoPrise(true);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {!displayVideo && <Button style={{ position: 'absolute', zIndex: 3, bottom: '10%' }}
                onClick={() => {
                    takePhoto();
                }}
            >
                Prendre une photo
            </Button>}
            {photoPrise && <Button style={{ position: 'absolute', zIndex: 2, bottom: '10%', left: '30%' }}
                onClick={() => {
                    sendPhoto();
                }}
            >
                Envoyer la photo
            </Button>}
            <Button>
                <label>
                    <input onChange={onfileSelection} type="file" style={{ display: 'none' }} accept=".png" />
                    Envoyer une photo depuis l''appareil
                </label></Button>
            {displayVideo && <video ref={videoElementRef} />}
            {displayVideo && <Button style={{ position: 'absolute', zIndex: 2, bottom: '10%' }}
                onClick={() => {
                    savePicture();
                }}
            >
                Click !
            </Button>}
            <canvas ref={canvasRef}> </canvas>
        </div>
    )
}
