import { useMutation } from "@tanstack/react-query"
import { contactAction } from "./action"
import { onError } from "@/utils/response-message"

export const useContactForm = () => {
	const { mutate: onContact, isPending: contactPending } = useMutation({
		mutationFn: contactAction,
		onSuccess: (res) => {
			if (!res.success && typeof res.error === "string") {
				onError(res.error)
			}
		}
	})

	return { onContact, contactPending }
}
