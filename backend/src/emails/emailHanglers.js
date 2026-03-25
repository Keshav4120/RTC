import { resendClient , sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"

export const sendWelcomeEmail = async (email , name , clientURL)=>{
    const {data,error} = await resendClient.emails.send({
        to:email,
        Subject:"Welcome to RTC",
        html: createWelcomeEmailTemplate(name , clientURL)
    });

    if(error) {
        console.error("error sending welcome email : " , error)
        throw new Error("Failed to send welcome email");
    }
    console.log("Welcome Email sent Successfully" , data);
}