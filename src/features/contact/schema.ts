import { z } from "zod"
import { Plan } from "./types"

export const contactSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	phone: z.string().min(1),
	restaurantName: z.string().min(1),
	plan: z.nativeEnum(Plan).optional(),
	message: z.string().min(1)
})

export type ContactSchemaType = z.infer<typeof contactSchema>
