//#region Import
import { Pencil, MoreVertical, Trash2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import React from "react"
//#endregion

interface CommentPreviewProps {
	comment: string
	onEdit: () => void
	onDelete: () => void
}

export const CommentPreview = ({ comment, onEdit, onDelete }: CommentPreviewProps) => {
	const handleEdit = (e: Event) => {
		e.stopPropagation()
		onEdit()
	}

	const handleDelete = (e: Event) => {
		e.stopPropagation()
		onDelete()
	}

	return (
		<div
			className='flex h-[50px] rounded-sm border border-amber-200 bg-white dark:border-gray-700 dark:bg-gray-800'
			onClick={onEdit}>
			<div className='flex justify-center border-e border-amber-200/90 px-2 pt-3 dark:border-gray-700'>
				<MessageSquare className='size-4 shrink-0 text-amber-500 dark:text-amber-400' />
			</div>

			<div className='flex-1 overflow-hidden p-2'>
				<p className='line-clamp-2 text-xs text-gray-700 dark:text-gray-300'>{comment}</p>
			</div>

			<div
				className='flex cursor-pointer items-center justify-center border-s border-amber-200/90 px-2 dark:border-gray-700'
				onClick={(e) => e.stopPropagation()}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='h-full w-full !p-0 text-amber-600 hover:bg-transparent hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300'
							size='sm'
							aria-label='Comment options'
							title='Comment options'>
							<span className='sr-only'>Comment options</span>
							<MoreVertical className='size-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='w-36'>
						<DropdownMenuItem onSelect={handleEdit} className='flex cursor-pointer items-center gap-2'>
							<Pencil className='h-3.5 w-3.5' />
							<span>Edit</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onSelect={handleDelete}
							className='flex cursor-pointer items-center gap-2 text-red-600 dark:text-red-400'>
							<Trash2 className='size-3.5' />
							<span>Delete</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}
