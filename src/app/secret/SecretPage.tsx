"use client"

import { useState } from "react"
import prisma from "../db"

const SecretPage = ({ guests }: { guests: any }) => {
	const [password, setPassword] = useState("")
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [error, setError] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (password === "linhdan_love_amau_and_choco") {
			try {
				setIsAuthenticated(true)
				setError("")
			} catch (err) {
				setError("Erreur lors du chargement des données")
			}
		} else {
			setError("Mot de passe incorrect")
		}
	}

	return (
		<div className="p-8">
			{!isAuthenticated ? (
				<form onSubmit={handleSubmit} className="max-w-md mx-auto">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-2 border rounded"
						placeholder="Entrez le mot de passe"
					/>
					{error && <p className="text-red-500 mt-2">{error}</p>}
					<button
						type="submit"
						className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
					>
						Accéder
					</button>
				</form>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border">
						<thead>
							<tr className="bg-gray-100">
								<th className="p-3">Nom</th>
								<th className="p-3">Prénom</th>
								<th className="p-3">Email</th>
								<th className="p-3">Église</th>
								<th className="p-3">Cocktail</th>
								<th className="p-3">Dîner</th>
								<th className="p-3">Brunch</th>
								<th className="p-3">Régime</th>
								<th className="p-3">Intolérances</th>
							</tr>
						</thead>
						<tbody>
							{guests.map((guest: any) => (
								<tr key={guest.id} className="border-t">
									<td className="p-3">{guest.lastName}</td>
									<td className="p-3">{guest.firstName}</td>
									<td className="p-3">{guest.email}</td>
									<td className="p-3">{guest.eglise}</td>
									<td className="p-3">{guest.cocktail}</td>
									<td className="p-3">{guest.diner}</td>
									<td className="p-3">{guest.brunch}</td>
									<td className="p-3">{guest.diet.join(", ")}</td>
									<td className="p-3">{guest.intolerances.join(", ")}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}

export default SecretPage
