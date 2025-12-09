import type { TenantUser } from "./types"

export const isSuperAdmin = (user: TenantUser | null): boolean => {
	return user?.role === "super-admin"
}

export const authenticated = (user: TenantUser | null) => Boolean(user)
