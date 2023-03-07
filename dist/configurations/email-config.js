"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const environments_1 = require("../environments/environments");
const constants_1 = require("../utils/constants/constants");
const nodemailer = require("nodemailer");
// create reusable transporter object using the default SMTP transport
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: environments_1.environment.email,
        pass: environments_1.environment.passAplicationEmail, // generated ethereal password
    },
});
// Realiza la verificación y conexión con el Email
exports.transporter.verify().then(() => console.log(constants_1.CONSTANTS.NODEMAILER_VALID));
