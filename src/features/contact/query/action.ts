"use server"

import type { GenericResponse } from "@/types"
import { contactSchema, type ContactSchemaType } from "../schema"
import resend from "@/lib/resend"
import AdminEmail from "@/emails/admin-email"
import ThankYouEmail from "@/emails/thank-you-email"

export const contactAction = async (
	data: ContactSchemaType
): GenericResponse<void, Record<string, string[]> | string> => {
	try {
		const safeData = contactSchema.safeParse(data)

		if (!safeData.success) {
			return {
				success: false,
				error: safeData.error.flatten().fieldErrors
			}
		}

		const [{ error: thankYouEmailError }, { error: adminEmailError }] = await Promise.all([
			resend.emails.send({
				from: process.env.RESEND_SENDER_EMAIL!,
				subject: "Thank you for contacting us!",
				react: ThankYouEmail({
					firstName: safeData.data.firstName,
					lastName: safeData.data.lastName,
					restaurantName: safeData.data.restaurantName
				}),
				to: [safeData.data.email]
			}),
			resend.emails.send({
				from: process.env.RESEND_SENDER_EMAIL!,
				subject: "New message received",
				react: AdminEmail(safeData.data),
				to: [process.env.RESEND_ADMIN_EMAIL!]
			})
		])

		if (thankYouEmailError || adminEmailError) {
			throw new Error(`Failed to send email: ${thankYouEmailError?.message || adminEmailError?.message}`)
		}

		return {
			success: true,
			message: "Thank you for your message. We will get back to you within 24 hours."
		}
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Something went wrong while sending the email. Please try again later."
		}
	}
}
