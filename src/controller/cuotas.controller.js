import { APP_PASSWORD, FROM } from "../config.js";
import alumnosModel from "../model/alumnos.model.js";
import nodemailer from 'nodemailer';
import authController from "./auth.controller.js";
const controller = {};
/**
 * Function to validate Email;
 * @param {string} email 
 * @returns 
 */
controller.validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
controller.fetchToken = async () => {
    try {
        const token = await authController.getToken();
        return token;
    } catch (error) {
        console.error("Error fetching tokem :"+error);
    }
}
controller.toSendEmails = async () => {
    try {
        const token = controller.fetchToken();
        const interval = 30*60*1000;
        setInterval(controller.fetchToken, interval);
        const ciclo = '2025';
        const alumnos = await alumnosModel.getAllAlumnos(ciclo);
        const transporter = controller.toMakeTransporter();
        const from = 'chavezzsilvio@gmail.com';
        const subject = 'Prueba 1';
        const text = 'Este es el contenido del correo en texto plano.';
        const html = `<p>Este es el contenido del correo en <b>HTML</b>.</p>`;

        for (const alumno of alumnos) {
            if (alumno.email) {
                const to = alumno.email;
                const mailOptions = controller.toMakeMailOptions(from, to, subject, text, html);
                try {
                    await controller.toMakeEmail(transporter, mailOptions);
                    console.log(`Correo enviado a: ${alumno.email}`);
                } catch (error) {
                    console.error(`Error enviando correo a ${alumno.email}:`, error);
                }
            }
        }
    } catch (error) {
        console.error("Error fetching alumnos!", error);
    }
};

controller.toMakeEmail = async (transporter, mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(new Error("Error al enviar correo: " + error.message));
            } else {
                console.log('Correo Enviado:', info.response);
                resolve(info);
            }
        });
    });
};

/**
 * 
 * @param {*} to 
 * @param {*} subject 
 * @param {*} text 
 * @param {*} html 
 * @returns 
 */
controller.toMakeMailOptions = (to, subject, text, html) => {
    const mailOptions = {
        from: FROM,
        to: to,
        subject: subject,
        text: text,
        html: html
    };
    return mailOptions;
};

/**
 * Function to make trasporter
 * @returns Objet to send email
 */
controller.toMakeTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: FROM, 
            pass: APP_PASSWORD
        }
    });
};

export default controller;