import { v4 as newId } from "uuid"
import { MotionDiv } from "../motion/motion-div"
import { cn } from "@/utils/cn"

interface MarqueeProps extends React.ComponentProps<typeof MotionDiv> {
	animationDirection?: "left" | "right"
	children: React.ReactNode
}

export function Marquee({ animationDirection = "right", children, className, ...props }: MarqueeProps) {
	return (
		<MotionDiv
			{...props}
			className={cn("mx-auto max-w-[1000px] overflow-x-hidden whitespace-nowrap", className)}
			style={{ WebkitMaskBoxImage }}>
			<div className='relative'>
				{Array.from({ length: 2 }, (_, idx) => (
					<div
						key={newId()}
						className={cn(
							"prevent-selection flex w-max overflow-hidden py-2 will-change-transform",
							idx === 0 && animationDirection === "left" && "animate-to-left-marquee-1",
							idx === 0 && animationDirection === "right" && "animate-to-right-marquee-1",
							idx === 1 && animationDirection === "left" && "animate-to-left-marquee-2",
							idx === 1 && animationDirection === "right" && "animate-to-right-marquee-2",
							idx === 1 && "absolute top-0"
						)}>
						{children}
					</div>
				))}
			</div>
		</MotionDiv>
	)
}

const WebkitMaskBoxImage =
	"linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 10%, hsl(0 0% 0% / 1) 90%, hsl(0 0% 0% / 0))"
