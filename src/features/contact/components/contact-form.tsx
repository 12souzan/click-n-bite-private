"use client"

//#region Import
import { useState } from "react"
import { MotionDiv } from "@/components/motion/motion-div"
import { fadeInVariants } from "@/lib/motion/configs"
import { AnimatePresence } from "motion/react"
import { ContactSuccessMessage } from "./contact-success-message"
import { ContactFormContent } from "./contact-form-content"
//#endregion

export const ContactForm = () => {
	const [isSuccess, setIsSuccess] = useState(false)

	return (
		<AnimatePresence mode='wait'>
			<MotionDiv
				{...fadeInVariants}
				key={isSuccess ? "success" : "form"}
				className='bg-background flex flex-col justify-between rounded-2xl p-5 shadow-xl md:p-6'>
				{isSuccess ? <ContactSuccessMessage /> : <ContactFormContent onSuccess={() => setIsSuccess(true)} />}
			</MotionDiv>
		</AnimatePresence>
	)
}
