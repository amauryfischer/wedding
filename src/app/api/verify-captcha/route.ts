import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

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
			const presignedUrl = `https://72t1jvrie5.execute-api.eu-west-3.amazonaws.com/etape/manager/`

			return NextResponse.json({
				success: true,
				message: "Captcha vérifié avec succès",
				presignedUrl: presignedUrl
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