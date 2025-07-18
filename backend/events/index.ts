import { MailEvent } from "@shared/enums";
import { login, signup } from "../mailer/mailer";

import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

eventEmitter.on(MailEvent.userLogin, login)
eventEmitter.on(MailEvent.userSignup, signup)

export { eventEmitter}