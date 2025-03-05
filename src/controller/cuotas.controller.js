import { APP_PASSWORD, FROM } from "../config.js";
import alumnosModel from "../model/alumnos.model.js";
import nodemailer from 'nodemailer';
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
controller.toMakeMailOptions = ( emailAlumno , alumno_id ) => {
    const mailOptions = {
        from: FROM,
        to: emailAlumno,
        subject: 'Cuota Instituto SJ',
        text: 'Link de pago de cuota en instituto SJ',
        html:`
                <link>
                    https://sistemasaintjohns.com.ar/Formulario/pagos.html?alumno_id=${alumno_id}
                </link>`
    };
    return mailOptions;
};
controller.toMakeArrayMailOptions = async ( req , res ) => {
    try {
        const ciclo = '2025';
        const alumnos = await alumnosModel.getAllAlumnos(ciclo);
        const arrayMailOptions = [];
        console.log(alumnos.length);
        if( alumnos.length>0){
            for (let i = 0; i < alumnos.length; i++) {
                if(alumnos[i].id && alumnos[i].email);
                const mailOptions = controller.toMakeMailOptions(alumnos[i].email,alumnos[i].id);
                arrayMailOptions.push(mailOptions);
            }
        }
        return arrayMailOptions;
    } catch (error) {
        console.error("Error makeing array mail Options :"+error);
    }
}

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
controller.toSendEmails = async (transporter, arrMailOptions) => {
    try {
        for (let index = 0; index < arrMailOptions.length; index++) {
            // Usamos await para esperar a que el correo se envíe antes de continuar
     //       const info = await transporter.sendMail(arrMailOptions[index]);
            console.log('Correo Enviado:', arrMailOptions[index]);
        }
    } catch (error) {
        console.error('Error al enviar correo:', error);
    }
};
controller.App = async ( req , res ) => {
    try {
        const transporter = controller.toMakeTransporter();
        const arrayMailOptions = await controller.toMakeArrayMailOptions();
            controller.toSendEmails(transporter,arrayMailOptions);
    } catch (error) {
        console.error(error);
    }
}

export default controller;