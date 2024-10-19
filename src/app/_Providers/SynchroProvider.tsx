
import { useEffect } from "react"

interface SynchroProviderProps {
	children: React.ReactNode
}
const SynchroProvider = ({ children }: SynchroProviderProps) => {

	useEffect(() => {

	}, [])
	return <>{children}</>
}

export default SynchroProvider
