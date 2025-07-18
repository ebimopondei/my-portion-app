import { Details } from "express-useragent";
import User from "../database/models/User";
import { nodemailer, getTransporter } from "./config";

const HOST_MAIL = "info@preskeyshop.com";

const login = async(user: User, options: { ip: string, useragent:Details })=>{

    const now = new Date();

    const time = now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const day = now.toLocaleString('en-US', { day: 'numeric' });
    const month = now.toLocaleString('en-US', { month: 'short' });
    const year = now.toLocaleString('en-US', { year: '2-digit' });

    const combinedFormattedDateTime = `${time.replace(',', '')} ${day}${month}, ${year}`; 
    const mailConfig = {
        from: HOST_MAIL,
        to: user.email,
        template: "login",
        context: {
            name: user.firstname ,
            login_time: combinedFormattedDateTime,
            ip_address: options.ip,
            device_info: options.useragent.os,
            support_email: "info@preskeyshop.com"
        },
        
        subject: "Login Successful!",
    }

    const mailTransporter = getTransporter();

    if (!mailTransporter) {
            console.error("❌ Email transporter not initialized.");
            return { success: false, message: "Email service unavailable." };
    }
     
    try{

        const info = await mailTransporter.sendMail(mailConfig);

        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
            console.info(`✅ Welcome email sent to ${user.email}. MessageId: ${info.messageId}`);
            console.info("✉️ Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }

        return { success: true, message: "Welcome email sent successfully." };
    } catch (err:any) {
        console.error(`❌ Error sending welcome email to ${user.email}:`, err);
        return { success: false, message: `Failed to send welcome email: ${err.message || 'Unknown error'}` };
    }
}

const signup = async(user: User)=>{
    const mailConfig = {
        from: HOST_MAIL,
        to: user.email,
        template: "welcome",
        context: {
            name: user.email ,
            support_email: "info@preskeyshop.com"
        },
        
        subject: "Welcome To StashFlow",
    }

    const mailTransporter = getTransporter();
    if (!mailTransporter) {
            console.error("❌ Email transporter not initialized.");
            return { success: false, message: "Email service unavailable." };
    }
     
    try{

        const info = await mailTransporter.sendMail(mailConfig);
        
        if (process.env.NODE_ENV === 'development') {
            console.info(`✅ Welcome email sent to ${user.email}. MessageId: ${info.messageId}`);
            console.info("✉️ Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }

        return { success: true, message: "Welcome email sent successfully." };
    } catch (err:any) {
        console.error(`❌ Error sending welcome email to ${user.email}:`, err);
        return { success: false, message: `Failed to send welcome email: ${err.message || 'Unknown error'}` };

    }
}

export { 
    login, 
    signup
}


