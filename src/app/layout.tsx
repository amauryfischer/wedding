import GlobalStyle from "@/ui/fondations/GlobalStyle"
import AppBarMenu from "@/ui/organisms/Bars/AppBarMenu"
import Modals from "@/ui/organisms/Modals/Modals"
import type { Metadata } from "next"
import { Providers } from "./_Providers/Providers"
import "./globals.css"
import { ChildrenContainer } from "./baseCss"
import { Manrope } from "next/font/google"

// If loading a variable font, you don't need to specify the font weight
const manrope = Manrope({
	weight: ["400", "700"],
	display: "swap",
	variable: "--font-manrope",
	adjustFontFallback: false,
	subsets: ["latin"]
})

export const metadata: Metadata = {
	title: "Mariage de Linh et Amaury",
	description: "Mariage de Linh et Amaury"
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="fr" className={manrope.variable}>
			<body>
				<Providers>
					<GlobalStyle />
					<Modals />
					<AppBarMenu />
					<ChildrenContainer>{children}</ChildrenContainer>
				</Providers>
			</body>
		</html>
	)
}
