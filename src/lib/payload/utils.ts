import { getPayload as getPayloadFn } from "payload"
import config from "@payload-config"
import type { TenantUser } from "./types"

export const getPayload = async () => {
	return await getPayloadFn({ config })
}

export const getUserTenantID = (user?: TenantUser): string | undefined => {
	if (!user || user.role === "super-admin") return undefined

	return typeof user.tenant === "string" ? user.tenant : user?.tenant?.id
}
