"use client"

import type { ContactSetting } from "@payload-types"
import { m } from "motion/react"
import { slideUpVariants } from "@/lib/motion/configs"
import { cn } from "@/utils/cn"
import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { ImageMedia } from "@/components/payload/image-media"
import { type OpeningHour, OpeningHoursDisplay } from "./opening-hours-display"
import { Button } from "@/components/ui/button"

export const TenantContactLocations = ({ branches }: { branches: ContactSetting["branches"] }) => {
	const [activeBranch, setActiveBranch] = useState(branches?.[0]?.id)

	const selectedBranch = branches?.find((branch) => branch.id === activeBranch) || branches?.[0]

	return (
		<section>
			<m.h2 variants={slideUpVariants} className='mb-8 text-center text-2xl font-bold md:text-3xl'>
				Our locations
			</m.h2>

			<m.div variants={slideUpVariants} className='mb-8 flex flex-wrap justify-center gap-4'>
				{branches?.map((branch) => (
					<Button
						key={branch.id}
						onClick={() => setActiveBranch(branch.id)}
						className={cn(
							"h-max rounded-full px-6 py-3",
							activeBranch === branch.id
								? "bg-neutral-900 text-white dark:bg-neutral-700"
								: "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
						)}>
						{branch.name}
					</Button>
				))}
			</m.div>

			<m.div key={selectedBranch?.id} variants={slideUpVariants} className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
				<div className='overflow-hidden rounded-lg bg-white shadow-lg dark:bg-neutral-800'>
					<div className='relative h-64'>
						<ImageMedia resource={selectedBranch?.image} fill className='object-cover' />
					</div>
					<div className='p-6'>
						<h3 className='mb-4 text-xl font-bold'>{selectedBranch?.name} Branch</h3>
						<div className='space-y-4'>
							<div className='flex items-start gap-3'>
								<MapPin className='mt-0.5 size-5 text-neutral-600 dark:text-neutral-400' />
								<p className='text-neutral-700 dark:text-neutral-300'>{selectedBranch?.address}</p>
							</div>
							<div className='flex items-center gap-3'>
								<Phone className='size-5 text-neutral-600 dark:text-neutral-400' />
								<a
									href={`tel:${selectedBranch?.phone}`}
									className='text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100'>
									{selectedBranch?.phone}
								</a>
							</div>
							<div className='flex items-center gap-3'>
								<Mail className='size-5 text-neutral-600 dark:text-neutral-400' />
								<a
									href={`mailto:${selectedBranch?.email}`}
									className='text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100'>
									{selectedBranch?.email}
								</a>
							</div>
							<OpeningHoursDisplay openingHours={selectedBranch?.openingHours as OpeningHour[]} />
						</div>
					</div>
				</div>

				{/* Map */}
				<div className='h-[500px] overflow-hidden rounded-lg bg-white shadow-lg dark:bg-neutral-800'>
					<iframe
						src={selectedBranch?.mapUrl}
						width='100%'
						height='100%'
						style={{ border: 0 }}
						allowFullScreen
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
						title={`Map of ${selectedBranch?.name} branch`}
						onError={(e) => {
							console.error("Error loading map", e)
						}}
					/>
				</div>
			</m.div>
		</section>
	)
}
