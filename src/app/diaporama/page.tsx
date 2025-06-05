"use client"
import { RepeatOneSharp } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"

// Mode développement pour tester sans WebSocket
const DEV_MODE = false

// Images de test pour le mode développement
const DEV_IMAGES = [
	"https://picsum.photos/800/600?random=1",
	"https://picsum.photos/800/600?random=2",
	"https://picsum.photos/800/600?random=3",
	"https://picsum.photos/800/600?random=4",
	"https://picsum.photos/800/600?random=5",
	"https://picsum.photos/800/600?random=6"
]

// Messages de test pour le mode développement
const DEV_MESSAGES = [
	"Félicitations aux mariés ! 🎉Félicitations aux mariés ! 🎉Félicitations aux mariés ! 🎉Félicitations aux mariés ! 🎉",
	"Que votre amour soit éternel ❤️ lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
	"Une journée magique pour deux âmes sœurs",
	"L'amour triomphe toujours ! 💕",
	"Voici le début de votre belle histoire Voici le début de votre belle histoire Voici le début de votre belle histoire Voici le début de votre belle histoire",
	"Que le bonheur vous accompagne toujours",
	"Un moment inoubliable capturé ✨",
	"L'amour est dans l'air ce soir !",
	"Deux cœurs qui ne font plus qu'un 💞Deux cœurs qui ne font plus qu'un 💞Deux cœurs qui ne font plus qu'un 💞Deux cœurs qui ne font plus qu'un 💞",
	"Que cette union soit bénie pour toujours"
]

export default function Page() {
	const [message, setMessage] = useState<string | null>(null)
	const [images, setImages] = useState<string[]>([])
	const imagesRef = useRef(images)
	const imageRef = useRef<HTMLImageElement>(null)
	const [displayedImageIndex, setDisplayeImageIndex] = useState<number | null>(
		null
	)
	const [isImageLoading, setIsImageLoading] = useState(false)
	const [fadeClass, setFadeClass] = useState("opacity-100")

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

	const displayDevImage = (imageUrl: string) => {
		setIsImageLoading(true)
		setFadeClass("opacity-0")

		if (imageRef.current) {
			imageRef.current.src = imageUrl
			imageRef.current.onload = () => {
				setIsImageLoading(false)
				setTimeout(() => {
					setFadeClass("opacity-100")
				}, 100)
			}
		}

		// Message aléatoire
		const randomMessage =
			DEV_MESSAGES[Math.floor(Math.random() * DEV_MESSAGES.length)]
		setMessage(randomMessage)
	}
	
	const displayImage = (key: string) => {
		setIsImageLoading(true)
		setFadeClass("opacity-0")

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
					imageRef.current.onload = () => {
						setIsImageLoading(false)
						setTimeout(() => {
							setFadeClass("opacity-100")
						}, 100)
					}
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

	//setUp de la connection Websocket ou mode DEV
	useEffect(() => {
		if (DEV_MODE) {
			console.log("Mode développement activé")
			// Simuler l'ajout d'images de test
			DEV_IMAGES.forEach((_, index) => {
				setTimeout(() => {
					addImageToList(`dev-image-${index}`)
				}, index * 1000) // Ajouter une image toutes les secondes
			})
		} else {
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
						// En mode DEV, on boucle en continu
						if (DEV_MODE) {
							newIndex = 0 // Retour au début
						} else {
							// on retourne l'index courant si on est à la fin
							newIndex = previousIndex
						}
					}
					console.log(`Nouvelle valeur: ${newIndex}`)
					return newIndex
				})
			} else {
				console.log("Rien à afficher")
			}
		}, 3000) // Changement toutes les 3 secondes en mode DEV

		return () => {
			console.log("clean up websocket connexion")
			if (!DEV_MODE && webSocket) {
				webSocket.close()
			}
			clearInterval(changeImageTimerId)
		}
	}, [])

	useEffect(() => {
		console.log(`Affichage de l'image n°: ${displayedImageIndex}`)
		console.log(`Images: ${JSON.stringify(imagesRef.current)}`)
		if (displayedImageIndex != null) {
			const key = imagesRef.current[displayedImageIndex]
			console.log(`Clé de l'image à afficher: ${key}`)

			if (DEV_MODE && key.startsWith("dev-image-")) {
				// Mode développement : utiliser les images de test
				const imageIndex = Number.parseInt(key.split("-")[2])
				const imageUrl = DEV_IMAGES[imageIndex]
				displayDevImage(imageUrl)
			} else {
				// Mode production : utiliser l'API
				displayImage(key)
			}
		}
	}, [displayedImageIndex])

	return (
		<div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4 overflow-hidden">
			{/* Indicateur de mode développement */}
			{DEV_MODE && (
				<div className="absolute top-4 right-4 z-10">
					<div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold animate-pulse">
						MODE DEV
					</div>
				</div>
			)}

			{/* Fond avec animation de cœurs */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-10 left-10 text-white/60 text-sm animate-pulse">
					♥
				</div>
				<div className="absolute top-20 right-20 text-pink-200/40 text-xs animate-ping">
					♥
				</div>
				<div className="absolute bottom-32 left-16 text-white/50 text-base animate-bounce">
					♥
				</div>
				<div className="absolute bottom-20 right-32 text-pink-100/70 text-sm animate-pulse">
					♥
				</div>
				<div className="absolute top-1/2 left-8 text-white/30 text-xs animate-ping">
					♥
				</div>
				<div className="absolute top-1/3 right-12 text-pink-200/40 text-sm animate-bounce">
					♥
				</div>
			</div>

			{/* Container de l'image */}
			<div className="relative flex items-center justify-center max-w-6xl max-h-[75vh] mb-6">
				{isImageLoading && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-12 h-12 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
					</div>
				)}
				<img
					ref={imageRef}
					alt="Souvenir partagé"
					className={`max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl transition-all duration-700 transform hover:scale-[1.02] ${fadeClass}`}
				/>
			</div>

			{/* Container du message */}
			{message && (
				<div
					className={`max-w-2xl mx-auto text-center transition-all duration-500 ${fadeClass}`}
				>
					<div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
						<p className="text-gray-800 text-xl md:text-2xl font-serif italic leading-relaxed">
							<span className="text-3xl text-purple-600 mr-2">"</span>
							{message}
							<span className="text-3xl text-purple-600 ml-2">"</span>
						</p>
					</div>
				</div>
			)}

			{/* Éléments décoratifs flottants - Cœurs */}
			<div className="absolute top-20 left-1/4 text-white/60 text-2xl animate-bounce">
				♥
			</div>
			<div className="absolute bottom-40 right-1/4 text-pink-200/70 text-xl animate-pulse">
				♥
			</div>
			<div className="absolute top-1/3 right-20 text-white/40 text-3xl animate-ping">
				♥
			</div>
			<div className="absolute bottom-1/3 left-20 text-pink-300/50 text-lg animate-bounce">
				♥
			</div>
			<div className="absolute top-1/2 right-1/4 text-white/30 text-sm animate-pulse">
				♥
			</div>
			<div className="absolute bottom-1/2 left-1/3 text-pink-100/60 text-xl animate-bounce">
				♥
			</div>
		</div>
	)
}
