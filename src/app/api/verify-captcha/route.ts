import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	try {
		const { token } = await request.json()

		if (!token) {
			return NextResponse.json(
				{ success: false, message: "Token manquant" },
				{ status: 400 }
			)
		}

		// Vérifier le token auprès de Cloudflare Turnstile
		const turnstileResponse = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					secret: process.env.TURNSTILE_SECRET_KEY,
					response: token,
					remoteip:
						request.headers.get("x-forwarded-for") ||
						request.headers.get("x-real-ip") ||
						"unknown"
				})
			}
		)

		const result = await turnstileResponse.json()

		if (result.success) {
			return NextResponse.json({
				success: true,
				message: "Captcha vérifié avec succès, url présigné : <a remplir>"
			})
		}

		console.warn("Échec vérification Turnstile:", result)
		return NextResponse.json(
			{
				success: false,
				message: "Échec de la vérification du captcha",
				errors: result["error-codes"]
			},
			{ status: 400 }
		)
	} catch (error) {
		console.error("Erreur lors de la vérification du captcha:", error)
		return NextResponse.json(
			{ success: false, message: "Erreur serveur interne" },
			{ status: 500 }
		)
	}
} 