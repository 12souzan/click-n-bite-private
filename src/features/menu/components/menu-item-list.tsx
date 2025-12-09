//#region Import
import { ImageCarousel } from "@/components/ui/image-carousel"
import { BasketButton } from "@/features/basket/components/basket-button"
import { MotionDiv } from "@/components/motion/motion-div"
import { slideUpVariants } from "@/lib/motion/configs"
import { ItemPrice } from "./item-price"
import { ItemCalories } from "./item-calories"
import { MenuItem as MenuItemType } from "@payload-types"
import { MenuItemTag } from "../types"
import { TagBadge } from "./tag-badge"
//#endregion

export const MenuItemList = (item: MenuItemType) => {
	const { description, images, name, price, tags, calories } = item

	return (
		<MotionDiv
			variants={slideUpVariants}
			className='flex w-full items-start gap-3 overflow-hidden rounded-lg border border-gray-100 bg-white p-2 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800'>
			<div className='relative size-16 flex-shrink-0 overflow-hidden rounded-md sm:size-[84px]'>
				<ImageCarousel images={images} alt={name} hideControls />
			</div>

			<div className='flex flex-1 flex-col gap-1.5'>
				<div className='flex flex-col justify-between sm:flex-row'>
					<h3 className='flex items-center gap-1.5 text-base font-medium whitespace-nowrap'>
						{name}

						{tags?.map((tag) => (
							<TagBadge key={tag} tag={tag as MenuItemTag} />
						))}
					</h3>

					<ItemPrice price={price} />
				</div>

				<p className='line-clamp-2 text-xs text-gray-600 sm:text-sm dark:text-gray-300'>{description}</p>

				<div className='flex items-center justify-between gap-2'>
					<ItemCalories calories={calories} />

					<BasketButton {...item} />
				</div>
			</div>
		</MotionDiv>
	)
}
