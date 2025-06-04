"use client"
import { Button, Card, CardBody, Image, Input } from "@nextui-org/react"
import React, { ChangeEvent, ChangeEventHandler, useEffect } from "react"
import { useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import ImageIcon from "@mui/icons-material/Image"
import SecurityIcon from "@mui/icons-material/Security"
import { useSearchParams } from "next/navigation"
import { Turnstile } from "@marsidev/react-turnstile"
import { Stringifier } from "postcss"

export default function Page() {
	const [photoPrise, setPhotoPrise] = React.useState(false)
	const [imagePreview, setImagePreview] = React.useState<string | null>(null)
	const [isUploading, setIsUploading] = React.useState(false)
	const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
	const [isVerifyingCaptcha, setIsVerifyingCaptcha] = useState(false)
	const [captchaError, setCaptchaError] = useState<string | null>(null)
	const [isVerified, setIsVerified] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [presignedUrl, setPresignedUrl] = useState<string | null>(null)

	const searchParams = useSearchParams()
	const fileInputRef = useRef<HTMLInputElement>(null)
	const messageInputRef = useRef<HTMLInputElement>(null)

	// Charger l'état de vérification depuis localStorage
	useEffect(() => {
		const verified = localStorage.getItem("gallery-user-verified")
		const storedUrl = localStorage.getItem("gallery-presigned-url")
		setIsVerified(verified === "true")
		setPresignedUrl(storedUrl)
		setIsLoading(false)
	}, [])

	// Sauvegarder l'état de vérification dans localStorage
	const updateVerificationStatus = (
		status: boolean,
		result: { presignedUrl?: string; apiToken: string; WSSToken: string }
	) => {
		setIsVerified(status)
		localStorage.setItem("gallery-user-verified", status.toString())
		localStorage.setItem("apiToken", result.apiToken)
		localStorage.setItem("WSSToekn", result.WSSToken)
		if (result.presignedUrl) {
			setPresignedUrl(result.presignedUrl)
			localStorage.setItem("gallery-presigned-url", result.presignedUrl)
		}
	}

	const uploadImage = (data: Blob | null) => {
		if (!data || !presignedUrl) {
			alert("Erreur : URL de téléversement manquante")
			return
		}
		setIsUploading(true)
		const imageId = uuidv4()
		// envoi de la photo
		fetch(`${presignedUrl}${imageId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "image/png",
				unnomdifferent: localStorage.getItem("apiToken") as string
			},
			body: data
		})
			.then(() => {
				alert("Envoi réussi")
				setImagePreview(null)
				setPhotoPrise(false)
				setSelectedFile(null)
				if (fileInputRef.current) {
					fileInputRef.current.value = ""
				}
			})
			.catch((error) => {
				console.error("Upload error:", error)
				alert("Erreur lors de l'envoi")
			})
			.finally(() => {
				setIsUploading(false)
			})
		if (messageInputRef.current?.value) {
			// envoi du potentiel message
			fetch(`${presignedUrl}${imageId}/message`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					unnomdifferent: localStorage.getItem("apiToken") as string
				},
				body: JSON.stringify({
					message: messageInputRef.current?.value
				})
			})
		}
	}

	// Vérification du captcha
	const handleCaptchaSuccess = async (token: string) => {
		setIsVerifyingCaptcha(true)
		setCaptchaError(null)

		try {
			const response = await fetch("/api/verify-captcha", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token })
			})

			const result = await response.json()

			if (result.success && result.presignedUrl) {
				updateVerificationStatus(true, result)
			} else {
				setCaptchaError("Échec de la vérification. Veuillez réessayer.")
			}
		} catch (error) {
			console.error("Erreur vérification captcha:", error)
			setCaptchaError("Erreur de connexion. Veuillez réessayer.")
		} finally {
			setIsVerifyingCaptcha(false)
		}
	}

	const handleCaptchaError = () => {
		setCaptchaError("Erreur lors du chargement du captcha. Rechargez la page.")
	}

	const handleCaptchaExpire = () => {
		setCaptchaError("Le captcha a expiré. Veuillez le refaire.")
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
		if (selectedFile) {
			uploadImage(selectedFile)
		} else {
			alert("Aucune image sélectionnée pour l'envoi.")
			console.log(
				"Upload attempt with no selectedFile, imagePreview:",
				imagePreview,
				"photoPrise:",
				photoPrise
			)
		}
	}

	const handleNativeCameraCapture = () => {
		setPhotoPrise(true)
		if (fileInputRef.current) {
			fileInputRef.current.accept = "image/*"
			fileInputRef.current.capture = "environment"
			fileInputRef.current.click()
		}
	}

	const handleFileSystemSelect = () => {
		setPhotoPrise(false)
		if (fileInputRef.current) {
			fileInputRef.current.accept = "image/png, image/jpeg"
			fileInputRef.current.removeAttribute("capture")
			fileInputRef.current.click()
		}
	}

	const clearSelection = () => {
		setImagePreview(null)
		setSelectedFile(null)
		setPhotoPrise(false)
		if (fileInputRef.current) {
			fileInputRef.current.value = ""
		}
	}

	const handleRetakeOrChooseAnother = () => {
		clearSelection()
		if (photoPrise) {
			handleNativeCameraCapture()
		} else {
			handleFileSystemSelect()
		}
	}

	if (isLoading) {
		// Chargement initial
		return (
			<div
				className="flex flex-col items-center justify-center p-4 text-white"
				style={{
					height: "calc(100vh - var(--navbar-height) - 100px)",
					overflow: "hidden"
				}}
			>
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
			</div>
		)
	}

	if (!isVerified) {
		// Si pas encore vérifié, afficher le captcha
		return (
			<div
				className="flex flex-col items-center justify-center p-4 text-white"
				style={{
					height: "calc(100vh - var(--navbar-height) - 100px)",
					overflow: "hidden"
				}}
			>
				<Card className="max-w-md w-full bg-white/30 backdrop-blur-md">
					<CardBody className="p-8 space-y-6 text-center">
						<div className="flex flex-col items-center space-y-4">
							<SecurityIcon style={{ fontSize: 64, color: "#6B7280" }} />
							<h1 className="text-3xl font-bold text-gray-800">
								Vérification de sécurité
							</h1>
							<p className="text-gray-700">
								Pour protéger notre galerie, veuillez compléter cette
								vérification rapide.
							</p>
						</div>

						{captchaError && (
							<div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
								{captchaError}
							</div>
						)}

						<div className="flex justify-center">
							<Turnstile
								siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
								onSuccess={handleCaptchaSuccess}
								onError={handleCaptchaError}
								onExpire={handleCaptchaExpire}
							/>
						</div>

						{isVerifyingCaptcha && (
							<div className="flex items-center justify-center space-x-2">
								<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
								<span className="text-gray-700">Vérification en cours...</span>
							</div>
						)}
					</CardBody>
				</Card>
			</div>
		)
	}

	// Interface principale une fois vérifié
	return (
		<div
			className="flex flex-col items-center justify-center p-4 text-white"
			style={{
				height: "calc(100vh - var(--navbar-height) - 100px)",
				overflow: "hidden"
			}}
		>
			<Card className="max-w-md w-full bg-white/30 backdrop-blur-md flex flex-col max-h-full">
				<CardBody className="p-8 space-y-6 overflow-y-auto flex-grow">
					<h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
						Partagez vos Souvenirs !
					</h1>

					{imagePreview && (
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

					{!imagePreview && (
						<button
							type="button"
							className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer w-full bg-transparent font-inherit"
							onClick={handleNativeCameraCapture}
						>
							<ImageIcon
								style={{ fontSize: 64, marginBottom: 16, color: "#6B7280" }}
							/>
							<p className="text-gray-600">Glissez-déposez une image ici</p>
							<p className="text-sm text-gray-500">ou</p>
						</button>
					)}

					<div className="flex flex-col space-y-4">
						{!imagePreview && (
							<>
								<Button
									color="secondary"
									variant="ghost"
									startContent={<FileUploadIcon />}
									onClick={handleFileSystemSelect}
									className="w-full"
								>
									Choisir une photo
								</Button>
								<Button
									color="primary"
									variant="ghost"
									startContent={<PhotoCameraIcon />}
									onClick={handleNativeCameraCapture}
									className="w-full"
								>
									Prendre une photo
								</Button>
							</>
						)}

						{imagePreview && (
							<>
								<div className="grid grid-cols-1 gap-4">
									<Input
										ref={messageInputRef}
										placeholder="Vous pouvez joidnre un message"
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<Button
										color="primary"
										variant="solid"
										startContent={isUploading ? null : <FileUploadIcon />}
										onClick={handleUploadSelectedImage}
										className="w-full"
										isLoading={isUploading}
									>
										Envoyer cette photo
									</Button>
									<Button
										color="warning"
										variant="flat"
										onClick={handleRetakeOrChooseAnother}
										className="w-full"
									>
										{photoPrise ? "Reprendre" : "Choisir une autre"}
									</Button>
								</div>
							</>
						)}
						{imagePreview && (
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
					<input
						ref={fileInputRef}
						onChange={onfileSelection}
						type="file"
						style={{ display: "none" }}
					/>
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
