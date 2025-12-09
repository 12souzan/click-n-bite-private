import { usePathname } from "next/navigation"

export const useIsActiveLink = (href?: null | string) => {
	const currentPath = usePathname()

	const isActive = !href ? false : currentPath === href.toString() || currentPath.startsWith(`${href.toString()}/`)

	return isActive
}
