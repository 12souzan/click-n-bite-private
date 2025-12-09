import { Shield, Eye, Lock, Database, UserCheck, Globe } from "lucide-react"
import Link from "next/link"
import { MotionDiv } from "@/components/motion/motion-div"
import { SectionBadge } from "@/components/landing/section-badge"
import { ROUTES } from "@/next.routes"
import { contactInfo } from "@/data/landing"

export default function PrivacyPolicyPage() {
	return (
		<div className='custom-container py-12'>
			<div className='mx-auto max-w-4xl'>
				<MotionDiv
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='mb-12 text-center'>
					<SectionBadge icon={Shield}>Privacy & Security</SectionBadge>

					<h1 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-gray-100'>Privacy Policy</h1>
					<p className='mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300'>
						Your privacy is important to us. This policy explains how we collect, use, and protect your information.
					</p>
					<p className='mt-4 text-sm text-gray-500 dark:text-gray-400'>Last updated: July 6, 2025</p>
				</MotionDiv>

				<MotionDiv
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className='space-y-8 rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800'>
					{/* Introduction */}
					<section>
						<div className='mb-4 flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30'>
								<Eye className='h-5 w-5 text-blue-600 dark:text-blue-400' />
							</div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Introduction</h2>
						</div>
						<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
							Bistro (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This
							Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
							digital menu platform and related services.
						</p>
					</section>

					{/* Information We Collect */}
					<section>
						<div className='mb-4 flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30'>
								<Database className='h-5 w-5 text-green-600 dark:text-green-400' />
							</div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Information We Collect</h2>
						</div>
						<div className='space-y-4'>
							<div>
								<h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100'>Personal Information</h3>
								<ul className='list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300'>
									<li>Name, email address, and phone number when you contact us</li>
									<li>Restaurant information and business details</li>
									<li>Payment information for subscription services</li>
									<li>Communication preferences and marketing consent</li>
								</ul>
							</div>
							<div>
								<h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100'>Usage Information</h3>
								<ul className='list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300'>
									<li>Device information (IP address, browser type, operating system)</li>
									<li>Usage patterns and interaction with our platform</li>
									<li>Menu views, order patterns, and customer preferences</li>
									<li>Performance data and error logs</li>
								</ul>
							</div>
						</div>
					</section>

					{/* How We Use Information */}
					<section>
						<div className='mb-4 flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30'>
								<UserCheck className='h-5 w-5 text-purple-600 dark:text-purple-400' />
							</div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>How We Use Your Information</h2>
						</div>
						<ul className='list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300'>
							<li>Provide and maintain our digital menu services</li>
							<li>Process payments and manage subscriptions</li>
							<li>Communicate with you about our services</li>
							<li>Improve our platform and develop new features</li>
							<li>Ensure security and prevent fraud</li>
							<li>Comply with legal obligations</li>
							<li>Send marketing communications (with your consent)</li>
						</ul>
					</section>

					{/* Information Sharing */}
					<section>
						<div className='mb-4 flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30'>
								<Globe className='h-5 w-5 text-orange-600 dark:text-orange-400' />
							</div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Information Sharing</h2>
						</div>
						<p className='mb-4 leading-relaxed text-gray-600 dark:text-gray-300'>
							We do not sell, trade, or rent your personal information to third parties. We may share your information
							in the following circumstances:
						</p>
						<ul className='list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300'>
							<li>With service providers who assist in operating our platform</li>
							<li>When required by law or to protect our rights</li>
							<li>In connection with a business transfer or acquisition</li>
							<li>With your explicit consent</li>
						</ul>
					</section>

					{/* Data Security */}
					<section>
						<div className='mb-4 flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30'>
								<Lock className='h-5 w-5 text-red-600 dark:text-red-400' />
							</div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Data Security</h2>
						</div>
						<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
							We implement appropriate technical and organizational security measures to protect your personal
							information against unauthorized access, alteration, disclosure, or destruction. This includes encryption,
							secure servers, and regular security assessments.
						</p>
					</section>

					{/* Your Rights */}
					<section>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>Your Rights</h2>
						<p className='mb-4 leading-relaxed text-gray-600 dark:text-gray-300'>
							Depending on your location, you may have the following rights regarding your personal information:
						</p>
						<ul className='list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300'>
							<li>Access and receive a copy of your personal data</li>
							<li>Rectify inaccurate or incomplete information</li>
							<li>Delete your personal information</li>
							<li>Restrict or object to processing</li>
							<li>Data portability</li>
							<li>Withdraw consent at any time</li>
						</ul>
					</section>

					{/* Cookies */}
					<section>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>Cookies and Tracking</h2>
						<p className='leading-relaxed text-gray-600 dark:text-gray-300'>
							We use cookies and similar tracking technologies to enhance your experience on our platform. For detailed
							information about our use of cookies, please see our{" "}
							<Link href={ROUTES.COOKIES} className='text-blue-600 hover:underline dark:text-blue-400'>
								Cookie Policy
							</Link>
							.
						</p>
					</section>

					{/* Contact */}
					<section className='rounded-lg bg-gray-50 p-6 dark:bg-gray-700'>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>Contact Us</h2>
						<p className='mb-4 leading-relaxed text-gray-600 dark:text-gray-300'>
							If you have any questions about this Privacy Policy or our data practices, please contact us:
						</p>
						<div className='space-y-2 text-gray-600 dark:text-gray-300'>
							<p>
								<strong>Email:</strong> {contactInfo.email}
							</p>
							<p>
								<strong>Address:</strong> {contactInfo.address}
							</p>
							<p>
								<strong>Phone:</strong> {contactInfo.phone}
							</p>
						</div>
					</section>
				</MotionDiv>
			</div>
		</div>
	)
}
