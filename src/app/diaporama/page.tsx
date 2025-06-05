"use client"
import { RepeatOneSharp } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"

export default function Page() {
	const [message, setMessage] = useState<string | null>(null)
	const [images, setImages] = useState<string[]>([])
	const imagesRef = useRef(images)
	const imageRef = useRef<HTMLImageElement>(null)
	const [displayedImageIndex, setDisplayeImageIndex] = useState<number | null>(
		null
	)

	let webSocket: WebSocket

	const addImageToList = (key: string) => {
		setImages((previousImages) => {
			console.log(
				`Mise à jour de la liste des images; valeur actuelle: ${JSON.stringify(previousImages)}`
			)
			const newValue = [...previousImages, key]
			console.log(`Nouvelle valeur: ${JSON.stringify(newValue)}`)
			return newValue
		})
	}
	const displayImage = (key: string) => {
		const imagePromise = fetch(
			`https://72t1jvrie5.execute-api.eu-west-3.amazonaws.com/etape/manager/${key}`,
			{
				method: "GET",
				headers: {
					unnomdifferent: localStorage.getItem("apiToken") as string
				}
			}
		)
		const messagePromise = fetch(
			`https://72t1jvrie5.execute-api.eu-west-3.amazonaws.com/etape/manager/${key}/message`,
			{
				method: "GET",
				headers: {
					unnomdifferent: localStorage.getItem("apiToken") as string
				}
			}
		)
		Promise.all([imagePromise, messagePromise]).then((values) => {
			values[0].blob().then((data) => {
				if (imageRef.current) {
					imageRef.current.src = URL.createObjectURL(data)
				}
				values[1].json().then((body) => {
					console.log(`Message recu: ${JSON.stringify(body)}`)
					setMessage(body.body.message)
				})
			})
		})
	}

	useEffect(() => {
		imagesRef.current = images
	})
	//setUp de la connection Websocket
	useEffect(() => {
		console.log("setup")
		webSocket = new WebSocket(
			`wss://swk5nkkaz8.execute-api.eu-west-3.amazonaws.com/production?token=${localStorage.getItem("WSSToken")}`
		)
		webSocket.onmessage = (event) => {
			console.log(event)
			console.log(event.data)
			console.log(JSON.stringify(event))
			addImageToList(event.data)
		}
		const changeImageTimerId = setInterval(() => {
			if (imagesRef.current.length > 0) {
				console.log(`${imagesRef.current.length} images à afficher`)
				setDisplayeImageIndex((previousIndex) => {
					console.log(
						`Mise à jour de l'index, valeur courante: ${previousIndex}`
					)
					let newIndex: number
					if (previousIndex === null) {
						// première itération, c'est la première image qu'il faut afficher
						newIndex = 0
					} else if (previousIndex < imagesRef.current.length - 1) {
						// on augmente uniquement si on a pas atteint la dernière image
						newIndex = previousIndex + 1
					} else {
						console.log("La dernière image est affichée")
						// on retourne l'index courant si on est à la fin
						newIndex = previousIndex
					}
					console.log(`Nouvelle valeur: ${newIndex}`)
					return newIndex
				})
			} else {
				console.log("Rien à afficher")
			}
		}, 5000)
		return () => {
			console.log("clean up websocket connexion")
			webSocket.close()
			clearInterval(changeImageTimerId)
		}
	}, [])

	useEffect(() => {
		console.log(`Affichage de l'image n°: ${displayedImageIndex}`)
		console.log(`Images: ${JSON.stringify(imagesRef.current)}`)
		if (displayedImageIndex != null) {
			const key = imagesRef.current[displayedImageIndex]
			console.log(`Clé de l'image à afficher: ${key}`)
			displayImage(key)
		}
	}, [displayedImageIndex])

	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				zIndex: 1,
				width: "100%",
				height: "50000px",
				backgroundColor: "white"
			}}
		>
			<img
				style={{
					margin: "auto"
				}}
				ref={imageRef}
				alt="currentDisplayedImage"
			/>
			{message && <h3>{message}</h3>}
		</div>
	)
}
