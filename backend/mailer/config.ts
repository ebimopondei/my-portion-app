import { Transporter } from "nodemailer";
import { HOST, PASSWORD, PORT, SECURE, USER } from "../config/mailer";
import hbs, { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars'

const nodemailer = require('nodemailer');
const Imap = require('imap');
const path = require('path');

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

const host = HOST;
const port = PORT;
const secure = SECURE;
const auth = {
    user: USER,
    pass: PASSWORD,
};

const rejectUnauthorized= false;

const imapConfig = {
    user: USER,
    password: PASSWORD,
    host: 'mail.privateemail.com',
    port: 993,
    tls: {
        rejectUnauthorized: true,
    }
};

const getTransporter = ():Transporter =>{

    if(!transporter){
        transporter =  nodemailer.createTransport({
            host,
            port,
            secure,
            auth,
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

const imap =  new Imap(imapConfig);

export { 
    nodemailer,
    imap,
    getTransporter
}