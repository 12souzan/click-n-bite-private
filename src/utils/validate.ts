/**
 * Validate a phone number
 * @param value - The phone number to validate
 * @returns True if the phone number is valid, otherwise an error message
 */
export const validatePhoneNumber = (value?: string | null) => {
	if (!value) return "Phone number is required."

	const phoneRegex = /^\+?[1-9]\d{1,14}$/ // Example regex for international phone numbers

	if (!phoneRegex.test(value)) {
		return "Invalid phone number format."
	}

	return true
}

export const validateEmail = (value?: string | null) => {
	if (!value) return "Email is required."

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	if (!emailRegex.test(value)) {
		return "Invalid email format."
	}
}
