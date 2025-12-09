export type GenericResponse<T = void, E = string> = Promise<
	T extends void
		? { success: true; message: string } | { success: false; error: E }
		: { success: true; data: T; message: string } | { success: false; error: E }
>
