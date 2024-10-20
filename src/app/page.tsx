"use client"
import type { RootState } from "@/redux/store";
import AppBarMenu from "@/ui/organisms/Bars/AppBarMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux";

export default function Home() {
	const { push } = useRouter()
	useEffect(() => {
		push("/rsvp")
	}, [])
	return <div>page principal</div>
}
