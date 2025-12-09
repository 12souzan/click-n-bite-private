"use client"

import { useAuth } from "@payloadcms/ui"

import { Banner } from "@payloadcms/ui/elements/Banner"
import { useMemo } from "react"

const BeforeDashboard = () => {
	const { user } = useAuth()

	const tenantName = useMemo(() => {
		if (!user) return null

		if (user.role === "super-admin") return "Super Admin"

		return user.tenant?.name
	}, [user])

	return (
		<div className='mb-6 w-max' style={{ width: "fit-content" }}>
			<Banner type='success'>
				<h4 className='m-0'>
					<span style={{ fontWeight: "bold" }}>{tenantName}</span> CMS Dashboard
				</h4>
			</Banner>
		</div>
	)
}

export default BeforeDashboard
