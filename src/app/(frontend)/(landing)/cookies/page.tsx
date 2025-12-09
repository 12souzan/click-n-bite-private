import { Cookie, Settings, BarChart3, Shield, Globe, Eye } from "lucide-react"

import { MotionDiv } from "@/components/motion/motion-div"
import { SectionBadge } from "@/components/landing/section-badge"

export default function CookiePolicyPage() {
	return (
		<div className='custom-container py-12'>
			<div className='mx-auto max-w-4xl'>
				<MotionDiv
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='mb-12 text-center'>
					<SectionBadge icon={Cookie} variant='orange'>
						Cookie Information
					</SectionBadge>

					<h1 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-gray-100'>Cookie Policy</h1>
					<p className='mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300'>
						Learn about how we use cookies and similar technologies to enhance your experience on our platform.
					</p>
					<p className='mt-4 text-sm text-gray-500 dark:text-gray-400'>Last updated: July 6, 2025</p>
				</MotionDiv>

				<MotionDiv
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className='space-y-8 rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800'>
					{/* What are Cookies */}
					<section>
						<div className='mb-4 flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30'>
								<Cookie className='h-5 w-5 text-orange-600 dark:text-orange-400' />
							</div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>What are Cookies?</h2>
						</div>
						<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
							Cookies are small text files that are stored on your device when you visit our website. They help us
							provide you with a better experience by remembering your preferences, analyzing how you use our site, and
							enabling certain functionality.
						</p>
					</section>

					{/* Types of Cookies */}
					<section>
						<h2 className='mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100'>Types of Cookies We Use</h2>

						<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
							{/* Essential Cookies */}
							<div className='rounded-lg bg-gray-50 p-6 dark:bg-gray-700'>
								<div className='mb-3 flex items-center gap-3'>
									<div className='flex size-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30'>
										<Shield className='h-4 w-4 text-red-600 dark:text-red-400' />
									</div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>Essential Cookies</h3>
								</div>
								<p className='mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
									These cookies are necessary for the website to function properly. They enable core functionality such
									as security, network management, and accessibility.
								</p>
								<p className='text-xs text-gray-500 dark:text-gray-400'>
									<strong>Cannot be disabled</strong> - Required for basic site functionality
								</p>
							</div>

							{/* Performance Cookies */}
							<div className='rounded-lg bg-gray-50 p-6 dark:bg-gray-700'>
								<div className='mb-3 flex items-center gap-3'>
									<div className='flex size-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30'>
										<BarChart3 className='h-4 w-4 text-blue-600 dark:text-blue-400' />
									</div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>Performance Cookies</h3>
								</div>
								<p className='mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
									These cookies help us understand how visitors interact with our website by collecting and reporting
									information anonymously.
								</p>
								<p className='text-xs text-gray-500 dark:text-gray-400'>
									<strong>Optional</strong> - Used for analytics and improvements
								</p>
							</div>

							{/* Functional Cookies */}
							<div className='rounded-lg bg-gray-50 p-6 dark:bg-gray-700'>
								<div className='mb-3 flex items-center gap-3'>
									<div className='flex-center size-8 rounded-lg bg-green-100 dark:bg-green-900/30'>
										<Settings className='h-4 w-4 text-green-600 dark:text-green-400' />
									</div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>Functional Cookies</h3>
								</div>
								<p className='mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
									These cookies enable enhanced functionality and personalization, such as remembering your preferences
									and settings.
								</p>
								<p className='text-xs text-gray-500 dark:text-gray-400'>
									<strong>Optional</strong> - Enhance user experience
								</p>
							</div>

							{/* Targeting Cookies */}
							<div className='rounded-lg bg-gray-50 p-6 dark:bg-gray-700'>
								<div className='mb-3 flex items-center gap-3'>
									<div className='flex-center size-8 rounded-lg bg-purple-100 dark:bg-purple-900/30'>
										<Eye className='h-4 w-4 text-purple-600 dark:text-purple-400' />
									</div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>Targeting Cookies</h3>
								</div>
								<p className='mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
									These cookies may be set by our advertising partners to build a profile of your interests and show
									relevant ads.
								</p>
								<p className='text-xs text-gray-500 dark:text-gray-400'>
									<strong>Optional</strong> - Used for personalized advertising
								</p>
							</div>
						</div>
					</section>

					{/* Specific Cookies */}
					<section>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>Specific Cookies We Use</h2>
						<div className='overflow-x-auto'>
							<table className='w-full border-collapse rounded-lg border border-gray-200 dark:border-gray-700'>
								<thead>
									<tr className='bg-gray-50 dark:bg-gray-700'>
										<th className='border border-gray-200 px-4 py-3 text-start text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100'>
											Cookie Name
										</th>
										<th className='border border-gray-200 px-4 py-3 text-start text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100'>
											Purpose
										</th>
										<th className='border border-gray-200 px-4 py-3 text-start text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100'>
											Duration
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className='border border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300'>
											Bistro_session
										</td>
										<td className='border border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300'>
											Maintains user session and login state
										</td>
										<td className='border border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300'>
											Session
										</td>
									</tr>
									<tr>
										<td className='border border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300'>
											theme_preference
										</td>
										<td className='border border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300'>
											Remembers your dark/light mode preference
										</td>
										<td className='border border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300'>
											1 year
										</td>
									</tr>
									<tr>
										<td className='border border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300'>
											cookie_consent
										</td>
										<td className='border border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300'>
											Stores your cookie consent preferences
										</td>
										<td className='border border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300'>
											1 year
										</td>
									</tr>
									<tr>
										<td className='border border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300'>
											_ga
										</td>
										<td className='border border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300'>
											Google Analytics - tracks user interactions
										</td>
										<td className='border border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300'>
											2 years
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</section>

					{/* Third-Party Cookies */}
					<section>
						<div className='mb-4 flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30'>
								<Globe className='h-5 w-5 text-indigo-600 dark:text-indigo-400' />
							</div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Third-Party Cookies</h2>
						</div>
						<p className='mb-4 leading-relaxed text-gray-600 dark:text-gray-300'>
							We may use third-party services that set their own cookies. These include:
						</p>
						<ul className='list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300'>
							<li>
								<strong>Google Analytics:</strong> For website analytics and performance monitoring
							</li>
							<li>
								<strong>Stripe:</strong> For secure payment processing
							</li>
							<li>
								<strong>Intercom:</strong> For customer support and communication
							</li>
							<li>
								<strong>Hotjar:</strong> For user experience analysis and heatmaps
							</li>
						</ul>
					</section>

					{/* Managing Cookies */}
					<section>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>
							Managing Your Cookie Preferences
						</h2>
						<div className='space-y-4'>
							<div>
								<h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100'>Browser Settings</h3>
								<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
									You can control and manage cookies through your browser settings. Most browsers allow you to block or
									delete cookies, though this may affect your experience on our website.
								</p>
							</div>
							<div>
								<h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100'>Cookie Consent</h3>
								<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
									When you first visit our website, you&apos;ll see a cookie consent banner where you can choose which
									types of cookies to accept. You can change your preferences at any time by clicking the cookie
									settings link in our footer.
								</p>
							</div>
						</div>
					</section>

					{/* Updates */}
					<section>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>Updates to This Policy</h2>
						<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
							We may update this Cookie Policy from time to time to reflect changes in our practices or for other
							operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
							updated policy on our website.
						</p>
					</section>

					{/* Contact */}
					<section className='rounded-lg bg-gray-50 p-6 dark:bg-gray-700'>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>Questions About Cookies?</h2>
						<p className='mb-4 leading-relaxed text-gray-600 dark:text-gray-300'>
							If you have any questions about our use of cookies, please contact us:
						</p>
						<div className='space-y-2 text-gray-600 dark:text-gray-300'>
							<p>
								<strong>Email:</strong> privacy@Bistro.com
							</p>
							<p>
								<strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105
							</p>
							<p>
								<strong>Phone:</strong> +1 (555) 123-4567
							</p>
						</div>
					</section>
				</MotionDiv>
			</div>
		</div>
	)
}
