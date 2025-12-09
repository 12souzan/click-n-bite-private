import type { CollectionSlug, Payload, PayloadRequest } from "payload"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const filename = fileURLToPath(import.meta.url)

const dirname = path.dirname(filename)

const collections: CollectionSlug[] = ["media", "users", "tenants", "categories", "menu-items", "external-orders"]

// No globals currently used — adjust if needed later
const globals: never[] = []

export const seed = async ({ payload, req }: { payload: Payload; req: PayloadRequest }): Promise<void> => {
	payload.logger.info("Seeding database...")

	// Clear media directory
	payload.logger.info(`— Clearing media...`)
	const mediaDir = path.resolve(dirname, "../../public/media")

	if (fs.existsSync(mediaDir)) {
		fs.rmSync(mediaDir, { recursive: true, force: true })
	}

	// Clear globals (none currently)
	payload.logger.info(`— Clearing collections and globals...`)

	for (const global of globals) {
		await payload.updateGlobal({
			data: {},
			req,
			slug: global
		})
	}

	// Clear all collections
	for (const collection of collections) {
		await payload.delete({
			collection,
			req,
			where: {
				id: {
					exists: true
				}
			}
		})
	}

	payload.logger.info("Seeded database successfully!")
}
