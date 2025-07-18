const HOST = process.env.MAIL_HOST;
const PORT = process.env.MAIL_PORT;
const SECURE = process.env.MAIL_SECURE;
const USER = process.env.MAIL_USER;
const PASSWORD = process.env.MAIL_PASS;
const REJECTUNAUTHORIZED = process.env.MAIL_REJECTUNAUTHORIZED;

export {
    HOST,
    PORT,
    SECURE,
    USER,
    PASSWORD,
    REJECTUNAUTHORIZED
}

