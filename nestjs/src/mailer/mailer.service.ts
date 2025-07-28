import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Details } from 'express-useragent';
import { Transporter } from "nodemailer";
import hbs, { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars'
import { User } from 'src/database/models/User';


const nodemailer = require('nodemailer')
const path = require('path')

const handlebarOptions:NodemailerExpressHandlebarsOptions = {
    viewEngine: {
        extname: ".handlebars",
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views'),
    extName: ".handlebars",
}

let transporter: Transporter;
const rejectUnauthorized= false;

const HOST_MAIL = "info@portion.ng";


@Injectable()
export class MailerService {
    constructor(private readonly configService: ConfigService ){}


    getTransporter = ():Transporter =>{

    if(!transporter){
        transporter =  nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            port: this.configService.get<string>('MAIL_PORT'),
            secure: this.configService.get<string>('MAIL_SECURE'),
            auth: {
                user: this.configService.get<string>('MAIL_USER'),
                pass: this.configService.get<string>('MAIL_PASS')
            },
            tls: {rejectUnauthorized},
        })

        transporter.use('compile', hbs(handlebarOptions));
        transporter.verify((error:unknown) =>{
            if (error) {
                console.error("❌ Fatal Error: Could not connect to email server.", error);
            } else {
                console.info("🚀 Email connection successful!");
            }
        });
    }
    
    return transporter;
}

    loginMail = async(user: User, options: { ip: string, useragent:Partial<Details> })=>{

    const now = new Date();

    const time = now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const day = now.toLocaleString('en-US', { day: 'numeric' });
    const month = now.toLocaleString('en-US', { month: 'short' });
    const year = now.toLocaleString('en-US', { year: '2-digit' });

    console.log('user:', user.dataValues);
    console.log('user:', user.dataValues.email);
    const combinedFormattedDateTime = `${time.replace(',', '')} ${day}${month}, ${year}`; 
    const mailConfig = {
        from: HOST_MAIL,
        to: user.dataValues.email,
        template: "login",
        context: {
            name: user.dataValues.firstname ,
            login_time: combinedFormattedDateTime,
            ip_address: options.ip,
            device_info: options.useragent.os,
            support_email: "info@preskeyshop.com"
        },
        
        subject: "Login Successful!",
    }

    const mailTransporter = this.getTransporter();



    if (!mailTransporter) {
            console.error("❌ Email transporter not initialized.");
            return { success: false, message: "Email service unavailable." };
    }
     
    try{

        const info = await mailTransporter.sendMail(mailConfig);

        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
            console.info(`✅ Welcome email sent to ${user.dataValues.email}. MessageId: ${info.messageId}`);
            console.info("✉️ Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }

        return { success: true, message: "Welcome email sent successfully." };
    } catch (err:any) {
        console.error(`❌ Error sending welcome email to ${user.dataValues.email}:`, err);
        return { success: false, message: `Failed to send welcome email: ${err.message || 'Unknown error'}` };
    }
}


}
