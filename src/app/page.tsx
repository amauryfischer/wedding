"use client"
import type { RootState } from "@/redux/store";
import AppBarMenu from "@/ui/organisms/Bars/AppBarMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux";

const LoadingSpinner = () => {
	return (
		<div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-gray-900"></div>
	)
}
export default function Home() {
	const { push } = useRouter()
	useEffect(() => {
		push("/rsvp")
	}, [])
	return (
		<div className="h-screen w-full flex items-center justify-center">
			<div className="text-lg flex items-center gap-4">
				<LoadingSpinner />
				<div>Chargement en cours...</div>
			</div>
		</div>
	)
}
