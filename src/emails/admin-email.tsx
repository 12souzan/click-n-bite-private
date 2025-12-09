import type { ContactSchemaType } from "@/features/contact/schema"
import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components"

export const AdminEmail = ({ email, message, firstName, lastName, phone, restaurantName, plan }: ContactSchemaType) => (
	<Html>
		<Head />
		<Preview>
			New message received from {firstName} {lastName}
		</Preview>
		<Body style={main}>
			<Container style={container}>
				<Text style={paragraph}>
					A new message has been sent from {firstName} {lastName}.
				</Text>
				<Section>
					<table style={table}>
						<tr>
							<th style={th}>Field</th>
							<th style={th}>Details</th>
						</tr>
						<tr>
							<td style={td}>Full Name</td>
							<td style={td}>
								{firstName} {lastName}
							</td>
						</tr>
						<tr>
							<td style={td}>Email</td>
							<td style={td}>{email}</td>
						</tr>
						<tr>
							<td style={td}>Phone</td>
							<td style={td}>{phone}</td>
						</tr>
						<tr>
							<td style={td}>Restaurant Name</td>
							<td style={td}>{restaurantName}</td>
						</tr>
						<tr>
							<td style={td}>Plan</td>
							<td style={td}>{plan}</td>
						</tr>
						<tr>
							<td style={td}>Message</td>
							<td style={td}>{message}</td>
						</tr>
					</table>
				</Section>
			</Container>
		</Body>
	</Html>
)

export default AdminEmail

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const container = {
	margin: "0 auto",
	padding: "20px 0 48px"
}

const paragraph = {
	fontSize: "16px",
	lineHeight: "26px"
}

const table = {
	borderCollapse: "collapse" as const,
	marginTop: "20px",
	width: "100%"
}

const th = {
	backgroundColor: "#f2f2f2",
	border: "1px solid #dddddd",
	padding: "8px",
	textAlign: "left" as const
}

const td = {
	border: "1px solid #dddddd",
	padding: "8px",
	textAlign: "left" as const
}
