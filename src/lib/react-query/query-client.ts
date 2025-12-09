//#region Import
import { isServer, QueryClient } from "@tanstack/react-query"
//#endregion

const makeQueryClient = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000
			}
		}
	})

	return queryClient
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
	if (isServer) return makeQueryClient()

	if (!browserQueryClient) browserQueryClient = makeQueryClient()

	return browserQueryClient
}

export const queryClient = getQueryClient()
