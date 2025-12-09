import { env } from "@/constants/env-variables"
import { contactInfo } from "@/data/landing"
import type { ContactSchemaType } from "@/features/contact/schema"
import { Body, Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from "@react-email/components"

export const ThankYouEmail = ({
	firstName,
	lastName,
	restaurantName
}: Pick<ContactSchemaType, "firstName" | "lastName" | "restaurantName">) => (
	<Html>
		<Head />
		<Preview>Thank you for contacting Click&apos;n&apos;Bite.</Preview>
		<Body style={main}>
			<Container style={container}>
				<Img
					alt="Click'n'Bite"
					height='50'
					src={`${env.NEXT_PUBLIC_SERVER_URL}/common/click-n-bite-logo-small.png`}
					style={logo}
					width='170'
				/>
				<Text style={paragraph}>
					Dear {firstName} {lastName},
				</Text>
				<Text style={paragraph}>
					Thank you for contacting us regarding your restaurant, &quot;{restaurantName}&quot;. We sincerely appreciate
					your interest in our services. Our team will review your inquiry and respond promptly with further information
					to assist you in developing a tailored solution for your restaurant.
				</Text>

				<Section style={btnContainer}>
					<Button href={env.NEXT_PUBLIC_SERVER_URL} style={button}>
						Visit our Home Page
					</Button>
				</Section>
				<Text style={paragraph}>
					Kind regards,
					<br />
					Click&apos;n&apos;Bite Team
				</Text>
				<Hr style={hr} />
				<Text style={footer}>
					Beirut, Al Manara street <br /> Lebanon
				</Text>
				<Text style={footer}>{contactInfo.phone}</Text>
				<Text style={footer}>{contactInfo.email}</Text>
			</Container>
		</Body>
	</Html>
)

ThankYouEmail.PreviewProps = {
	firstName: "Alan",
	lastName: "Smith",
	restaurantName: "The Restaurant"
}

export default ThankYouEmail

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const container = {
	margin: "0 auto",
	padding: "20px 0 48px"
}

const logo = {
	margin: "0 auto"
}

const paragraph = {
	fontSize: "16px",
	lineHeight: "26px"
}

const btnContainer = {
	textAlign: "center" as const
}

const button = {
	backgroundColor: "#5F51E8",
	borderRadius: "3px",
	color: "#fff",
	display: "block",
	fontSize: "16px",
	padding: "12px",
	textAlign: "center" as const,
	textDecoration: "none"
}

const hr = {
	borderColor: "#cccccc",
	margin: "20px 0"
}

const footer = {
	color: "#8898aa",
	fontSize: "12px"
}
