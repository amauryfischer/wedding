import prisma from "@/app/db"
import { Coda } from "coda-js"
import { NextResponse } from "next/server"
import _ from "lodash"

export async function GET() {
	const coda = new Coda("219afda4-1f37-471d-9f70-dd366f93cb62")
	const doc = await coda.getDoc("Unw_8kRf4i")
	const tableIds = ["grid-Bd4JalDFJ8"]
	const rowsIds = [
		"c-i5iYfWO1uM", // image
		"c-cMZHpplwjB", // description
		"c-ZOwNWx3ewP", // prix
		"c-tKFV2rH44d" // url
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
					newRow[_.camelCase(name) ?? "categorie"] = value
				})
				return newRow
			})
			return data
		})
	)
	// Check if tables and products are not empty
	if (tables.length === 0 || tables[0].rows.length === 0) {
		return NextResponse.json({ message: "No data found" }, { status: 404 })
	}
	const products = tables[0].rows

	Object.entries(products).map(async ([key, value]) => {
		console.log("key=", key, "value=", value)
		// value.prix format is €1,645.00
		const prix = value.prix.replace("€", "").replace(",", "")
		await prisma.product.create({
			data: {
				description: value.description,
				imageUrl: value.imageUrl,
				prix: Number(prix),
				url: value.url
			}
		})
	})
	return NextResponse.json({ message: "OK" })
}
    