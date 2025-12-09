import type { MotionProps, Variants } from "motion/react"

const variantPresets = {
	initial: "initial",
	exit: "exit",
	animate: "animate"
}

export const containerVariants = {
	...variantPresets,
	variants: {
		initial: { opacity: 0 },
		exit: {
			opacity: 0,
			transition: {
				staggerChildren: 0.05,
				staggerDirection: -1
			}
		},
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05
			}
		}
	}
}

export const fadeInVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 }
}

export const fadeInWithScaleVariants: MotionProps = {
	animate: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.5 },
	initial: { opacity: 0, scale: 0.5 },
	transition: { duration: 0.1, ease: "easeInOut" }
}

export const blurIn: MotionProps = {
	exit: { filter: "blur(10px)", opacity: 0 },
	initial: { filter: "blur(10px)", opacity: 0 },
	animate: { filter: "blur(0px)", opacity: 1 },
	transition: { duration: 0.1, ease: "easeIn" }
}

export const scaleHeightUpVariants: MotionProps = {
	initial: { opacity: 0, height: 0 },
	animate: { opacity: 1, height: "auto" },
	exit: { opacity: 0, height: 0 },
	transition: { duration: 0.3, ease: "easeInOut" }
}

export const slideUpVariants: Variants = {
	initial: { y: 20, opacity: 0 },
	animate: { y: 0, opacity: 1 },
	exit: { y: 20, opacity: 0 }
}

export const slideUpLightVariants: MotionProps = {
	initial: { y: 5, opacity: 0 },
	animate: { y: 0, opacity: 1 },
	transition: { delay: 0.1, ease: "easeInOut" }
}

export const expandEheightVariants: MotionProps = {
	initial: { opacity: 0, height: 0 },
	animate: { opacity: 1, height: "auto" },
	exit: { opacity: 0, height: 0 },
	transition: { duration: 0.3, ease: "easeInOut" }
}

export const slideLeftVariants: MotionProps = {
	initial: { opacity: 0, x: -20 },
	animate: { opacity: 1, x: 0 },
	transition: { duration: 0.5, delay: 0.2 }
}

export const expandVariants = {
	hidden: {
		opacity: 0,
		height: 0,
		transition: {
			duration: 0.3,
			ease: "easeOut" as const
		}
	},
	visible: {
		opacity: 1,
		height: "auto",
		transition: {
			duration: 0.4,
			ease: "easeOut" as const
		}
	}
}
