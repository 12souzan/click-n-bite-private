"use client"

import { Button } from "@/components/ui/button"
import { contactInfo } from "@/data/landing"
import { AlertTriangle, Headset, RefreshCcw } from "lucide-react"
import Link from "next/link"

export default function MenuError({ error }: { error: Error }) {
	// console.log("Error from error page: ", error)

	return (
		<div className='flex-center flex-1 p-4'>
			<div className='border-destructive/20 bg-destructive/5 w-full max-w-md rounded-lg border p-5 text-center'>
				<div className='mb-8'>
					<div className='flex-center bg-destructive/10 mx-auto mb-4 w-max rounded-full p-4'>
						<AlertTriangle className='text-destructive size-6 shrink-0' />
					</div>
					<h1 className='mb-2 text-2xl font-bold text-gray-900 dark:text-white'>Something went wrong</h1>
					<p className='text-gray-600 dark:text-gray-400'>
						We encountered an unexpected error while loading this page.
					</p>
				</div>

				<div className='border-destructive/20 bg-destructive/10 mb-6 rounded-lg border p-4'>
					<p className='text-destructive font-mono text-sm break-words'>{error.message}</p>
				</div>

				<div className='flex-center flex-col gap-4 sm:flex-row'>
					<Button onClick={() => window.location.reload()}>
						<RefreshCcw />
						Refresh Page
					</Button>
					<Button asChild variant='outline'>
						<Link href={`mailto:${contactInfo.email}?subject=Error Report`}>
							<Headset />
							Contact Support
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
