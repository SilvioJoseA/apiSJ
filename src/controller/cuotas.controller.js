import { APP_PASSWORD, FROM } from "../config.js";
import alumnosModel from "../model/alumnos.model.js";
import nodemailer from 'nodemailer';
import cuotasModel from "../model/cuotas.model.js";
import Joi from "joi";
import authController from "./auth.controller.js";
const controller = {};
const cuotaEschema = Joi.object({ 
    alumno_id: Joi.number().required(),
    mes: Joi.string().required(),
    monto: Joi.number().required(),
    status: Joi.string().required(),
    id_pagos_tic: Joi.string().required(),
    usuario: Joi.string().required(),
    metodo: Joi.string().required(),
});
/**
 * Function to insert cuota by each month
 * @param {Object} req 
 * @param {Object} res  
 */ 
controller.addCuota = async ( req , res ) => {
    try {
        const { error } = cuotaEschema.validate(req.body);
        if( error ) {
            return res.status(400).json({ message: error.details[0].message});
        }
        const {alumno_id,mes,monto,status,id_pagos_tic,usuario,metodo} = req.body;
        await cuotasModel.insertCuota({alumno_id,mes,monto,status,id_pagos_tic,usuario,metodo});
        res.status(201).json({message:"Cuota inserted successfully!"});
    } catch (error) {
        console.error("Error adding cuota :", error.message);
    }
}
controller.createTableCuotas = async ( req , res ) => {
    try {
        await cuotasModel.createTableCuotas();
        res.status(201).json({message:"Cuotas table created successfully!"});
    } catch (error) {
        console.error("Error creating table cuotas :", error.message);
    }
}
/**
 * Function to validate Email;
 * @param {string} email 
 * @returns 
 */
controller.validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
controller.toMakeMailOptions = ( emailAlumno , alumno_id , link_form) => {
    const mailOptions = {
        from: FROM,
        to: 'chavezzsilvio@gmail.com',//emailAlumno,
        subject: `Cuota Saint John's`,
        text: `Link de pago de cuota en Saint John's`,
        html:`<!DOCTYPE html>
                <html lang="es">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Cuota Mensual</title>
                        <style>
                        body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        }
                .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            font-size: 16px;
            color: #ffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>Estimado/a,</p>
        <p>Espero que este mail le encuentre bien.</p>
        <p>Le recordamos la importancia de realizar el pago a tiempo a través de los medios habilitados para evitar recargos por mora.</p>
        <a href="${link_form}" class="button">Pagar</a>
        <p>Quedamos a disposición ante cualquier consulta.</p>
        <p>¡Saludos cordiales y que tenga un excelente mes!</p>
        <div class="footer">
            <p>Atentamente,</p>
            <p>Saint John's</p>
        </div>
    </div>
</body>
</html>`
    };
    return mailOptions;
};
controller.toMakeArrayMailOptions = async ( req , res ) => {
    try {
        const ciclo = '2025';
        const alumnos = await alumnosModel.getAllAlumnos(ciclo);
        const arrayMailOptions = [];
        const arrayObjectPayerAndAmount = [];
        console.log(alumnos.length); 
        if( alumnos.length>0){
            for (let i = 0; i < 10; i++) {
                if(alumnos[i].id && alumnos[i].email);
                
                arrayObjectPayerAndAmount.push(controller.toMakeObjectPayerAndAmount(alumnos[i]));
                const responsePTic = await controller.toMakeLinkCuota(controller.toMakeObjectPayerAndAmount(alumnos[i]));
                const mailOptions = controller.toMakeMailOptions(alumnos[i].email,alumnos[i].id,responsePTic.form_url);
                arrayMailOptions.push(mailOptions);
                await cuotasModel.insertCuota({alumno_id:alumnos[i].id,mes:'marzo',monto:alumnos[i].price_month,status:'pending',id_pagos_tic:responsePTic.id,usuario:'tic',metodo:'pagos-tic'});
               
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
            const info = await transporter.sendMail(arrMailOptions[index]);
            console.log('Correo Enviado:', info);
        }
    } catch (error) {
        console.error('Error al enviar correo:', error);
    }
};
controller.toMakeLinkCuota = async (oToSend) => {
    try {
        const token = await authController.getTokenBackend();
        console.log(token);
        const response = await authController.getFormPay(oToSend,token);
        return response;
    } catch (error) {
        console.error("Error in toMakeLinkCuota:", error);
    }
};
controller.toMakeObjectPayerAndAmount = ( alumno ) => {
    try {
        const amount = alumno.price_month || ' ';
        const objectPayer = {};
        const identification = {}
            objectPayer.name = alumno.firstName|| ' '+' '+lastName||' ';
            objectPayer.email = 'chavezzsilvio@gmail.com';
            identification.type = 'DNI_ARG';
            identification.number = alumno.dni || ' ';
            identification.country = 'ARG';
            objectPayer.identification = identification;
        const objectDetails = [{
            external_reference: "98725",
            concept_id: "920",
            concept_description: "Cuota Mensual",
            notification_url: "https://backend.acsaintjohns.org/pagos",
            amount : amount,
            }];
        const objectPayerAndMount = {
            currency_id: "ARS",
            external_transaction_id: objectPayer.name + '_' + objectPayer.identification.number + '_' + new Date().getTime() || 'name'+'_'+'1111111'+'_'+new Date().getTime(),      
            details:objectDetails,
            payer: objectPayer,
            due_date:controller.getLocalDateWithOffset(controller.getLastDayOfMarch(new Date()))
        }
        return objectPayerAndMount
    } catch (error) {
        console.error(error.message);
    }
}
controller.getLastDayOfMarch = (currentDate) => {
    const year = currentDate.getFullYear();
    const marchDate = new Date(year, 2, 28);
    if (currentDate > marchDate) {
        return new Date(year + 1, 2, 31);
    }
    return marchDate;
}
controller.getLocalDateWithOffset = (date) => {
    const pad = (num) => num.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const offsetMinutes = date.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
    const offsetRemainder = Math.abs(offsetMinutes % 60);
    const offsetSign = offsetMinutes > 0 ? "-" : "+";
    const offset = `${offsetSign}${pad(offsetHours)}${pad(offsetRemainder)}`;
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offset}`;
}
controller.App = async ( req , res ) => {
    try {
        const transporter = controller.toMakeTransporter();
        const arrayMailOptions = await controller.toMakeArrayMailOptions();
            controller.toSendEmails(transporter,arrayMailOptions);
    } catch (error) {
        console.error(error);
    }
}
controller.getAllCuotasByAllAlumnos = async ( req , res ) => {
    try {
        const rows = await cuotasModel.getAllCuotasByAllAlumnos('2025');
        res.status(201).json(rows)
    } catch (error) {
        console.error(error);
    }
}
const html = `<!DOCTYPE html>
                <html lang="es">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Cuota Mensual</title>
                        <style>
                        body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        }
                .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            font-size: 16px;
            color: #ffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>Estimado/a,</p>
        <p>Espero que este mail le encuentre bien.</p>
        <p>Le informamos que la factura correspondiente al mes de marzo ya ha sido emitida. Las fechas de vencimiento son:</p>
        <ul>
            <li><strong>1° vencimiento:</strong> 10 de cada mes</li>
            <li><strong>2° vencimiento:</strong> 15 de cada mes</li>
        </ul>
        <p>Le recordamos la importancia de realizar el pago a tiempo a través de los medios habilitados para evitar recargos por mora.</p>
        <a href="...." class="button">Pagar</a>
        <p>Quedamos a disposición ante cualquier consulta.</p>
        <p>¡Saludos cordiales y que tenga un excelente mes!</p>
        <div class="footer">
            <p>Atentamente,</p>
            <p>Saint John's</p>
        </div>
    </div>
</body>
</html>`;
export default controller;