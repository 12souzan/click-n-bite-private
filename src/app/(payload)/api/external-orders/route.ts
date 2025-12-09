import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getPayload, getUserTenantID } from "../../../../lib/payload/utils"
import { TenantUser } from "../../../../lib/payload/types"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://130.61.17.86:8080"

export async function GET() {
  try {
    const payload = await getPayload()
    const cookieStore = await cookies()
    const token = cookieStore.get("payload-token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }
    const base64Payload = token.split('.')[1]
    const decoded = JSON.parse(atob(base64Payload))
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }
    const fullUser = await payload.findByID({
      collection: 'users',
      id: decoded.id,
    })

    const tenantId = getUserTenantID(fullUser as TenantUser)
    if (!tenantId) {
      return NextResponse.json(
        { error: "Tenant ID not found" },
        { status: 400 }
      )
    }
    const response = await fetch(`${BASE_URL}/api/tenants/${tenantId}/orders`)

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`)
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error in /api/external-orders:", error)
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}