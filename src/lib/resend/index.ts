//#region Import
import { Resend } from "resend"
//#endregion

const resend = new Resend(process.env.RESEND_API_KEY!)

export default resend
