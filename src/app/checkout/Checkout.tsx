"use client"

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React from "react"

export default function Checkout() {
	const stripe = useStripe()

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const { data } = await axios.post("/api/checkout_sessions", {
				data: { amount: 89 }
			})
			const sessionUrl = data

			// Redirect the user to the Stripe Checkout page
			window.open(sessionUrl, "_blank")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<button type="submit">Submit</button>
		</form>
	)
}
