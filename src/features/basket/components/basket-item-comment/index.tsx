// "use client"

// import { useState, useCallback } from "react"
// import { MessageSquare, Check, X } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useBasketStore } from "@/features/basket/store"
// import { AnimatePresence } from "motion/react"
// import { MotionDiv } from "@/components/motion/motion-div"
// import { CommentPreview } from "./comment-preview"
// import { useTranslations } from "next-intl"

// interface BasketItemCommentProps {
// 	itemId: string
// 	comment: string
// }

// export function BasketItemComment({ itemId, comment }: BasketItemCommentProps) {
// 	const t = useTranslations("basket.itemComment")

// 	const updateItemComment = useBasketStore((state) => state.updateItemComment)

// 	const [isEditing, setIsEditing] = useState(false)

// 	const [currentComment, setCurrentComment] = useState(comment)

// 	const handleSave = useCallback(() => {
// 		updateItemComment(itemId, currentComment)
// 		setIsEditing(false)
// 	}, [updateItemComment, itemId, currentComment])

// 	const handleCancel = useCallback(() => {
// 		setCurrentComment(comment)
// 		setIsEditing(false)
// 	}, [comment])

// 	const handleDelete = useCallback(() => updateItemComment(itemId, ""), [updateItemComment, itemId])

// 	const handleEdit = useCallback(() => setIsEditing(true), [])

// 	return (
// 		<AnimatePresence mode='wait'>
// 			{isEditing ? (
// 				<MotionDiv
// 					initial={{ opacity: 0, height: 0 }}
// 					animate={{ opacity: 1, height: 96 }}
// 					exit={{ opacity: 0, height: 0 }}
// 					transition={{ duration: 0.3, ease: "easeInOut" }}
// 					className='flex flex-col gap-2'>
// 					<textarea
// 						value={currentComment}
// 						autoFocus
// 						onChange={(e) => setCurrentComment(e.target.value)}
// 						placeholder={t("placeholder")}
// 						className='border-border min-h-[60px] w-full origin-top resize-none rounded-md border bg-white px-2 py-1.5 text-base will-change-transform focus:ring-1 focus:ring-gray-300 focus:outline-none dark:bg-gray-800 dark:focus:ring-gray-600'
// 						spellCheck={false}
// 					/>
// 					<div className='flex justify-end gap-2'>
// 						<Button variant='outline' size='sm' onClick={handleCancel}>
// 							<X className='size-4' />
// 							{t("cancel")}
// 						</Button>
// 						<Button size='sm' onClick={handleSave}>
// 							<Check className='size-4' />
// 							{t("save")}
// 						</Button>
// 					</div>
// 				</MotionDiv>
// 			) : (
// 				<MotionDiv
// 					initial={{ opacity: 0, height: 0 }}
// 					animate={{ opacity: 1, height: comment ? 50 : 28 }}
// 					exit={{ opacity: 0, height: 96 }}>
// 					{comment ? (
// 						<CommentPreview comment={comment} onEdit={handleEdit} onDelete={handleDelete} />
// 					) : (
// 						<Button
// 							variant='ghost'
// 							size='sm'
// 							onClick={() => setIsEditing(true)}
// 							className='flex h-7 items-center gap-1 px-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700/20 dark:hover:text-gray-200'>
// 							<MessageSquare className='size-3' /> {t("trigger")}
// 						</Button>
// 					)}
// 				</MotionDiv>
// 			)}
// 		</AnimatePresence>
// 	)
// }

"use client"

import { useState, useCallback } from "react"
import { MessageSquare, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBasketStore } from "@/features/basket/store"
import { AnimatePresence } from "motion/react"
import { MotionDiv } from "@/components/motion/motion-div"
import { CommentPreview } from "./comment-preview"
import { useTranslations } from "next-intl"

interface BasketItemCommentProps {
	itemId: string
	comment: string
}

export function BasketItemComment({ itemId, comment }: BasketItemCommentProps) {
	const t = useTranslations("basket.itemComment")

	const updateItemComment = useBasketStore((state) => state.updateItemComment)

	const [isEditing, setIsEditing] = useState(false)

	const [currentComment, setCurrentComment] = useState(comment)

	const handleSave = useCallback(() => {
		updateItemComment(itemId, currentComment)
		setIsEditing(false)
	}, [updateItemComment, itemId, currentComment])

	const handleCancel = useCallback(() => {
		setCurrentComment(comment)
		setIsEditing(false)
	}, [comment])

	const handleDelete = useCallback(() => {
		updateItemComment(itemId, "")
		setCurrentComment("")
	}, [updateItemComment, itemId])

	const handleEdit = useCallback(() => setIsEditing(true), [])

	return (
		<AnimatePresence mode='wait'>
			{isEditing ? (
				<MotionDiv
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className='flex flex-col gap-2'>
					<div>
						<textarea
							value={currentComment}
							autoFocus
							onChange={(e) => setCurrentComment(e.target.value)}
							placeholder={t("placeholder")}
							className='border-border min-h-[60px] w-full origin-top resize-none rounded-md border bg-white px-2 py-1.5 text-base focus:ring-1 focus:ring-gray-300 focus:outline-none dark:bg-gray-800 dark:focus:ring-gray-600'
							spellCheck={false}
						/>
					</div>

					<div className='flex justify-end gap-2'>
						<Button variant='outline' size='sm' onClick={handleCancel}>
							<X className='size-4' />
							{t("cancel")}
						</Button>
						<Button size='sm' onClick={handleSave}>
							<Check className='size-4' />
							{t("save")}
						</Button>
					</div>
				</MotionDiv>
			) : (
				<MotionDiv
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: comment ? 50 : 28 }}
					exit={{ opacity: 0, height: 96 }}
					className='w-full'>
					<div className='w-full'>
						{comment ? (
							<div className='cursor-text' onClick={handleEdit}>
								<CommentPreview comment={comment} onEdit={handleEdit} onDelete={handleDelete} />
							</div>
						) : (
							<div onClick={handleEdit} className='cursor-pointer'>
								<Button
									variant='ghost'
									size='sm'
									className='flex h-7 w-full items-center gap-1 px-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700/20 dark:hover:text-gray-200'>
									<MessageSquare className='size-3' /> {t("trigger")}
								</Button>
							</div>
						)}
					</div>
				</MotionDiv>
			)}
		</AnimatePresence>
	)
}
