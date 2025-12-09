import { ImageCarousel } from "@/components/ui/image-carousel"
import { BasketButton } from "@/features/basket/components/basket-button"
import { MotionDiv } from "@/components/motion/motion-div"
import { slideUpVariants } from "@/lib/motion/configs"
import { ItemPrice } from "./item-price"
import { ItemCalories } from "./item-calories"
import { MenuItem as MenuItemType } from "@payload-types"
import { TagBadge } from "./tag-badge"
import { MenuItemTag } from "../types"

export const MenuItem = (item: MenuItemType) => {
	const { description, images, name, price, calories, tags } = item

	return (
		<MotionDiv
			variants={slideUpVariants}
			className='border-border bg-background flex h-[330px] flex-col overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-lg'>
			<div className='relative h-48 w-full'>
				<ImageCarousel images={images} alt={name} />

				{!!tags?.length && (
					<div className='absolute end-2 top-2 z-50 flex flex-col items-end gap-1.5'>
						{tags.map((tag) => (
							<TagBadge key={tag} tag={tag as MenuItemTag} />
						))}
					</div>
				)}
			</div>
			<div className='flex-1 px-3 py-2.5'>
				<div className='mb-2 flex items-start justify-between'>
					<h3 className='text-lg font-medium'>{name}</h3>

					<ItemPrice price={price} />
				</div>
				<p className='line-clamp-2 text-sm text-gray-600 dark:text-gray-300'>{description}</p>
			</div>

			<div className='flex items-end justify-between gap-2 p-2.5 pt-0'>
				<ItemCalories calories={calories} />

				<BasketButton {...item} />
			</div>
		</MotionDiv>
	)
}
