const formatNfdLowerCase = (str: string | Array<unknown> | object) => {
	if (!str) return ""
	let result

	if (Array.isArray(str)) {
		result = str.map((x: string | Array<unknown> | object) =>
			formatNfdLowerCase(x),
		)
		return result.join(" ")
	}
	if (typeof str === "object") {
		result = Object.entries(str).map(([key, value]) => {
			return `${key} : ${formatNfdLowerCase(value)}`
		})
		return result.join(" ")
	}
	result = str
		?.toString()
		?.normalize("NFD")
		?.replace(/[\u0300-\u036f]/g, "")
		?.toLowerCase()
	return result
}
export const sortNfdLowerCase = (a, b) => {
	const nameA = formatNfdLowerCase(a),
		nameB = formatNfdLowerCase(b)
	if (nameA < nameB)
		//sort string ascending
		return -1
	if (nameA > nameB) return 1
	return 0 //default return value (no sorting)
}
export default formatNfdLowerCase
