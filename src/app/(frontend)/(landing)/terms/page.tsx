import { FileText, Scale, AlertTriangle, CreditCard, Shield, Users } from "lucide-react"
import { MotionDiv } from "@/components/motion/motion-div"
import { SectionBadge } from "@/components/landing/section-badge"

export default function TermsPage() {
	return (
		<div className='custom-container py-12'>
			<div className='mx-auto max-w-4xl'>
				<MotionDiv
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='mb-12 text-center'>
					<SectionBadge icon={Scale}>Legal Terms</SectionBadge>

					<h1 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-gray-100'>Terms and Conditions</h1>
					<p className='mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300'>
						Please read these terms carefully before using our services. By using Bistro, you agree to these terms.
					</p>
					<p className='mt-4 text-sm text-gray-500 dark:text-gray-400'>Last updated: July 6, 2025</p>
				</MotionDiv>

				<MotionDiv
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className='space-y-8 rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800'>
					{/* Acceptance */}
					<section>
						<div className='mb-4 flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30'>
								<FileText className='h-5 w-5 text-blue-600 dark:text-blue-400' />
							</div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Acceptance of Terms</h2>
						</div>
						<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
							By accessing and using Bistro&apos;s digital menu platform and services, you accept and agree to be bound
							by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use
							this service.
						</p>
					</section>

					{/* Service Description */}
					<section>
						<div className='mb-4 flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30'>
								<Users className='h-5 w-5 text-green-600 dark:text-green-400' />
							</div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Service Description</h2>
						</div>
						<p className='mb-4 leading-relaxed text-gray-600 dark:text-gray-300'>
							Bistro provides a digital menu platform that enables restaurants to:
						</p>
						<ul className='list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300'>
							<li>Create and manage digital menus</li>
							<li>Generate QR codes for contactless menu access</li>
							<li>Enable digital ordering and basket functionality</li>
							<li>Share orders via social platforms</li>
							<li>Access analytics and insights</li>
							<li>Customize branding and themes</li>
						</ul>
					</section>

					{/* User Responsibilities */}
					<section>
						<div className='mb-4 flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30'>
								<Shield className='h-5 w-5 text-purple-600 dark:text-purple-400' />
							</div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>User Responsibilities</h2>
						</div>
						<p className='mb-4 leading-relaxed text-gray-600 dark:text-gray-300'>
							As a user of our services, you agree to:
						</p>
						<ul className='list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300'>
							<li>Provide accurate and complete information</li>
							<li>Maintain the security of your account credentials</li>
							<li>Use the service in compliance with applicable laws</li>
							<li>Not engage in any fraudulent or harmful activities</li>
							<li>Respect intellectual property rights</li>
							<li>Not attempt to disrupt or compromise our systems</li>
						</ul>
					</section>

					{/* Payment Terms */}
					<section>
						<div className='mb-4 flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30'>
								<CreditCard className='h-5 w-5 text-orange-600 dark:text-orange-400' />
							</div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Payment Terms</h2>
						</div>
						<div className='space-y-4'>
							<div>
								<h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100'>Subscription Fees</h3>
								<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
									Our services are provided on a subscription basis. Fees are charged in advance and are non-refundable
									except as required by law or as specified in our refund policy.
								</p>
							</div>
							<div>
								<h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100'>Cancellation</h3>
								<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
									You may cancel your subscription at any time. Cancellation will take effect at the end of your current
									billing period.
								</p>
							</div>
						</div>
					</section>

					{/* Intellectual Property */}
					<section>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>Intellectual Property</h2>
						<p className='mb-4 leading-relaxed text-gray-600 dark:text-gray-300'>
							The Bistro platform, including its design, functionality, and content, is protected by copyright,
							trademark, and other intellectual property laws. You retain ownership of your restaurant&apos;s content
							and data.
						</p>
						<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
							You grant us a limited license to use your content solely for the purpose of providing our services to
							you.
						</p>
					</section>

					{/* Limitation of Liability */}
					<section>
						<div className='mb-4 flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30'>
								<AlertTriangle className='h-5 w-5 text-red-600 dark:text-red-400' />
							</div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Limitation of Liability</h2>
						</div>
						<p className='mb-4 leading-relaxed text-gray-600 dark:text-gray-300'>
							To the maximum extent permitted by law, Bistro shall not be liable for any indirect, incidental, special,
							consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or
							other intangible losses.
						</p>
						<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
							Our total liability to you for any claim arising out of or relating to these terms or our services shall
							not exceed the amount paid by you to us in the twelve months preceding the claim.
						</p>
					</section>

					{/* Service Availability */}
					<section>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>Service Availability</h2>
						<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
							While we strive to maintain high service availability, we do not guarantee uninterrupted access to our
							services. We may perform maintenance, updates, or experience technical issues that temporarily affect
							service availability.
						</p>
					</section>

					{/* Termination */}
					<section>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>Termination</h2>
						<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
							We may terminate or suspend your account and access to our services immediately, without prior notice, if
							you breach these terms or engage in conduct that we determine to be harmful to our business or other
							users.
						</p>
					</section>

					{/* Changes to Terms */}
					<section>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>Changes to Terms</h2>
						<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
							We reserve the right to modify these terms at any time. We will notify you of any material changes via
							email or through our platform. Your continued use of our services after such modifications constitutes
							acceptance of the updated terms.
						</p>
					</section>

					{/* Governing Law */}
					<section>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>Governing Law</h2>
						<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
							These terms shall be governed by and construed in accordance with the laws of the State of California,
							without regard to its conflict of law provisions.
						</p>
					</section>

					{/* Contact */}
					<section className='rounded-lg bg-gray-50 p-6 dark:bg-gray-700'>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>Contact Information</h2>
						<p className='mb-4 leading-relaxed text-gray-600 dark:text-gray-300'>
							If you have any questions about these Terms and Conditions, please contact us:
						</p>
						<div className='space-y-2 text-gray-600 dark:text-gray-300'>
							<p>
								<strong>Email:</strong> legal@Bistro.com
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
