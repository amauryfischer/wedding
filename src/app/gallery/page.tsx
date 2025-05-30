"use client"
import { Button, Card, CardBody, Image, Snippet } from "@nextui-org/react"
import React, { ChangeEvent, ChangeEventHandler } from "react"
import { useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import ImageIcon from "@mui/icons-material/Image"

export default function Page() {
	const [displayVideo, setDisplayVideo] = React.useState(false)
	const [photoPrise, setPhotoPrise] = React.useState(false)
	const [imagePreview, setImagePreview] = React.useState<string | null>(null)
	const [isUploading, setIsUploading] = React.useState(false)
	const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
	const videoElementRef = useRef<HTMLVideoElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const uploadImage = (data: Blob | null) => {
		if (!data) return
		setIsUploading(true)
		const id = uuidv4()
		fetch(
			`https://72t1jvrie5.execute-api.eu-west-3.amazonaws.com/etape/manager/${id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "image/png",
					unnomdifferent: "h^#E!S5/7%GLJg3w(9ctb*"
				},
				body: data
			}
		)
			.then(() => {
				alert("Envoi réussi")
				setImagePreview(null) // Reset preview
				setPhotoPrise(false)
			})
			.catch((error) => {
				console.error("Upload error:", error)
				alert("Erreur lors de l'envoi")
			})
			.finally(() => {
				setIsUploading(false)
			})
	}

	const onfileSelection: ChangeEventHandler<HTMLInputElement> = (e) => {
		const file = e.target.files?.[0]
		if (file) {
			setSelectedFile(file)
			const reader = new FileReader()
			reader.onloadend = () => {
				setImagePreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleUploadSelectedImage = () => {
		if (selectedFile && !photoPrise) {
			uploadImage(selectedFile)
		} else if (imagePreview && photoPrise) {
			// For photos taken with camera
			canvasRef.current?.toBlob((blob) => {
				uploadImage(blob)
			})
		}
	}

	const takePhoto = () => {
		setPhotoPrise(false)
		setImagePreview(null)
		setDisplayVideo(true)
		navigator.mediaDevices
			.getUserMedia({
				video: {
					facingMode: { ideal: "environment" },
					width: { ideal: 1920 }, // Adjusted for better quality
					height: { ideal: 1080 }
				},
				audio: false
			})
			.then((stream) => {
				if (videoElementRef.current) {
					videoElementRef.current.srcObject = stream
					videoElementRef.current.play()
				}
			})
			.catch((err) => {
				console.error(`An error occurred: ${err}`)
				alert("Impossible d'accéder à la caméra. Vérifiez les autorisations.")
				setDisplayVideo(false)
			})
		if (canvasRef.current) {
			canvasRef.current.height = 0
			canvasRef.current.width = 0
		}
	}

	const sendPhoto = () => {
		canvasRef.current?.toBlob((image) => {
			uploadImage(image)
			setPhotoPrise(false)
			setImagePreview(null)
		})
	}

	const savePicture = () => {
		if (videoElementRef.current && canvasRef.current) {
			const video = videoElementRef.current
			const canvas = canvasRef.current
			const stream = video.srcObject as MediaStream
			const tracks = stream.getTracks()

			// Get the actual video dimensions once it's playing
			const width = video.videoWidth
			const height = video.videoHeight

			canvas.width = width
			canvas.height = height

			const context = canvas.getContext("2d")
			context?.drawImage(video, 0, 0, width, height)
			const dataUrl = canvas.toDataURL("image/png")
			setImagePreview(dataUrl)
			setDisplayVideo(false)
			setPhotoPrise(true)

			// Stop video tracks
			tracks.forEach((track) => track.stop())
			video.srcObject = null
		}
	}

	const retakePhoto = () => {
		setPhotoPrise(false)
		setImagePreview(null)
		takePhoto()
	}

	const clearSelection = () => {
		setImagePreview(null)
		setPhotoPrise(false)
		setSelectedFile(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = "" // Reset file input
		}
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen  p-4 text-white">
			<Card className="max-w-md w-full bg-white/30 backdrop-blur-md shadow-xl">
				<CardBody className="p-8 space-y-6">
					<h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
						Partagez vos Souvenirs !
					</h1>

					{displayVideo && (
						<div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
							<video
								ref={videoElementRef}
								className="w-full h-full object-cover"
							>
								<track kind="captions" />
							</video>
							<Button
								isIconOnly
								color="danger"
								variant="shadow"
								className="absolute top-4 right-4 z-10"
								onClick={() => {
									setDisplayVideo(false)
									const stream = videoElementRef.current
										?.srcObject as MediaStream
									stream?.getTracks().forEach((track) => track.stop())
									if (videoElementRef.current) {
										videoElementRef.current.srcObject = null
									}
								}}
							>
								X
							</Button>
						</div>
					)}

					{imagePreview && !displayVideo && (
						<div className="flex flex-col items-center space-y-4">
							<p className="text-xl text-gray-700">Aperçu :</p>
							<Image
								src={imagePreview}
								alt="Aperçu"
								width={400}
								height={300}
								className="rounded-lg shadow-md object-contain max-h-[60vh]"
							/>
						</div>
					)}

					{!displayVideo && !imagePreview && (
						<div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-400 rounded-lg p-6 text-center">
							<PhotoCameraIcon
								style={{ fontSize: 64, marginBottom: 16, color: "#6B7280" }}
							/>
							<p className="text-gray-600">Glissez-déposez une image ici</p>
							<p className="text-sm text-gray-500">ou</p>
						</div>
					)}

					<div className="flex flex-col space-y-4">
						{!displayVideo && !photoPrise && !imagePreview && (
							<>
								<Button
									color="secondary"
									variant="ghost"
									startContent={<FileUploadIcon />}
									onClick={() => fileInputRef.current?.click()}
									className="w-full"
								>
									Choisir une photo
									<input
										ref={fileInputRef}
										onChange={onfileSelection}
										type="file"
										style={{ display: "none" }}
										accept="image/png, image/jpeg"
									/>
								</Button>
								<Button
									color="primary"
									variant="ghost"
									startContent={<PhotoCameraIcon />}
									onClick={takePhoto}
									className="w-full"
								>
									Prendre une photo
								</Button>
							</>
						)}

						{displayVideo && (
							<Button
								color="success"
								variant="shadow"
								startContent={<PhotoCameraIcon />}
								onClick={savePicture}
								className="w-full text-lg py-3 text-white"
							>
								Capturer !
							</Button>
						)}

						{imagePreview && !displayVideo && (
							<div className="grid grid-cols-2 gap-4">
								<Button
									color="primary"
									variant="solid"
									startContent={<FileUploadIcon />}
									onClick={handleUploadSelectedImage}
									className="w-full"
									isLoading={isUploading}
								>
									Envoyer cette photo
								</Button>
								<Button
									color="warning"
									variant="flat"
									onClick={photoPrise ? retakePhoto : clearSelection}
									className="w-full"
								>
									{photoPrise ? "Reprendre" : "Choisir une autre"}
								</Button>
							</div>
						)}
						{imagePreview && !displayVideo && (
							<Button
								color="danger"
								variant="light"
								onClick={clearSelection}
								className="w-full"
							>
								Annuler la sélection
							</Button>
						)}
					</div>
					<div className="mt-6 w-full text-sm">
						<span className="text-gray-600">
							Les photos seront affichées en direct sur le projecteur !
						</span>
					</div>
				</CardBody>
			</Card>
		</div>
	)
}
