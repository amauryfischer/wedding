"use server"
import prisma from "../db"

export default async function Page() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold">
				La gallerie photo sera disponible pour le mariage !
			</h1>
		</div>
	)
}
