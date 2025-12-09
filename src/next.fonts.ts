import { Poppins, Kalam } from "next/font/google"

export const POPPINS = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"]
})

export const KALAM = Kalam({
	variable: "--font-kalam",
	subsets: ["latin"],
	weight: ["400", "700"]
})
