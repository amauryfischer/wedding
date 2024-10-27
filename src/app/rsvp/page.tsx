import prisma from "../db"
import Rsvp from "./Rsvp"
import { Coda } from "coda-js"
export default async function RsvpLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const coda = new Coda("219afda4-1f37-471d-9f70-dd366f93cb62")
	const doc = await coda.getDoc("Unw_8kRf4i")
	const tableIds = ["grid-Z3eZPK3Z6c"]
	const rowsIds = [
		"c-YL1ji5BwOO", // nom
		"c-FpkT55LyS8", // diner
		"c-XN3W-uOeHO", // brunch
		"c-6AAVJADMFB" // cocktail
	]
	const tables = await Promise.all(
		tableIds.map(async (tableId) => {
			const table = await doc.getTable(tableId)
			const rows = await table.listRows({})
			const data = {
				rows: rows.map((row) => row.values),
				columns: await Promise.all(
					rowsIds.map(async (rowId) => await table.getColumn(rowId))
				)
			}
			data.rows = data.rows.map((row) => {
				const newRow = {}
				Object.entries(row).map(([key, value]) => {
					// @ts-ignore
					const name = data.columns.find((column) => column.id === key)?.name
					// @ts-ignore
					newRow[name] = value
				})
				return newRow
			})
			return data
		})
	)
	const hebergements = await prisma.hebergement.findMany()
	return <Rsvp hebergements={hebergements} allGuests={tables[0].rows} />
}
