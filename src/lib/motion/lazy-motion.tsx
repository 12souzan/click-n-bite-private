"use client"

//#region Import
import { LazyMotion as LazyMotionComponent } from "motion/react"
//#endregion

const loadFeatures = () => import("./features").then((res) => res.domMax)

export const LazyMotion = ({ children }: { children: React.ReactNode }) => (
	<LazyMotionComponent features={loadFeatures} strict>
		{children}
	</LazyMotionComponent>
)
