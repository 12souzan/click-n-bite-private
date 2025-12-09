//#region Import
import { toast } from "sonner"
//#endregion

export const onError = (error: string, title?: string) => {
	console.error(error)

	toast.error(title || "An error occurred while processing your request", {
		description: error
	})
}
