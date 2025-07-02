import { APP_PASSWORD, FROM } from "../config.js";
import nodemailer from 'nodemailer';
import cuotasModel from "../model/cuotas.model.js";
import Joi from "joi";
import authController from "./auth.controller.js";
import alumnosModel from "../model/alumnos.model.js";
import alumnoController from "./alumnos.controller.js";
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
controller.toMakeMailOptions = ( emailAlumno = '', link_form) => {
    const mailOptions = {
        from:FROM,
        to:emailAlumno || 'saintjohns@gmail.com',//'chavezzsilvio@gmail.com',//emailAlumno || 'saintjohns@gmail.com',//emailAlumno,
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
            color: #fff;
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
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 150px;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="container">
<p>Estimado/a</p>
<p>  Cuota Mes de Julio </p>
<p>Espero que este mensaje le encuentre bien.</p>
<p>A continuación, puede acceder al botón de pago para la cuota del mes en curso:</p>
    <p>1° vencimiento: 15 de cada mes</p>
    <p>2° vencimiento: último día de cada mes</p>
         <a href="https://servicios.paypertic.com/formularios/v2/pagos/${link_form}" class="button">Pagar</a>
          
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
controller.toMakeArrayMailOptionsByModel = async ( ) => {
    try {
        const ciclo = '2025';
        const cuotas = await cuotasModel.getCuotasCreatedToday();
        console.log(cuotas);
        const arrayMailOptions = [];
        for (let i = 0; i < cuotas.length; i++) {
           if(cuotas[i].email) {
            const mailOptions = controller.toMakeMailOptions(cuotas[i].email,cuotas[i].id_pagos_tic);
            arrayMailOptions.push(mailOptions);
           }   
        }
         return arrayMailOptions;
    } catch (error) {
        console.error("Error fetching alumnos or meaking mailOptions :"+error);
    }
}
controller.toMakeArrayMailOptionsByModelSecond = async ( ) => {
    try {
        const ciclo = '2025';
        const cuotas = await cuotasModel.getCuotasPending();
        console.log(cuotas);
        const arrayMailOptions = [];
        for (let i = 0; i < cuotas.length; i++) {
           if(cuotas[i].email) {
            const mailOptions = controller.toMakeMailOptions(cuotas[i].email,cuotas[i].alumno_id,'https://servicios.paypertic.com/formularios/v2/pagos/'+cuotas[i].id_pagos_tic);
            arrayMailOptions.push(mailOptions);
           }   
        }
         return arrayMailOptions;
    } catch (error) {
        console.error("Error fetching alumnos or meaking mailOptions :"+error);
    }
}
controller.toMakeArrayMailOptionsAbril = async ( req , res ) => {
    try {
        const alumnos = await cuotasModel.getCuotasCreatedToday();
        const arrayMailOptions = [];
        console.log(alumnos);
        if( alumnos.length>0){
            for (let i = 0; i < alumnos.length; i++) {
              const mailOptions = controller.toMakeMailOptions(alumnos[i].email,alumnos[i].id_pagos_tic);
                arrayMailOptions.push(mailOptions);
            } 
        }
        return arrayMailOptions;
    } catch (error) {
        console.error("Error makeing array mail Options :"+error);
    }
}
controller.toMakeEmailsMayo = async ( ) => {
    try {
        
    } catch (error) {
        console.error("Error makeing emials ",error);
    }
}

controller.toMakeArrayMailOptions = async ( req , res ) => {
    try {
        const alumnos = await cuotasModel.getAlumnosNotPayed('abril');;
        const arrayMailOptions = [];
        const arrayObjectPayerAndAmount = [];
        console.log(alumnos.length); 
        if( alumnos.length>0){
            for (let i = 0; i < alumnos.length; i++){
                arrayObjectPayerAndAmount.push(controller.toMakeObjectPayerAndAmount(alumnos[i]));
                const responsePTic = await controller.toMakeLinkCuota(controller.toMakeObjectPayerAndAmount(alumnos[i]));
                const mailOptions = controller.toMakeMailOptions(alumnos[i].email,alumnos[i].id,responsePTic.form_url);
                arrayMailOptions.push(mailOptions);
                await cuotasModel.insertCuota({alumno_id:alumnos[i].id,mes:'abril',monto:controller.toGetAmount(alumnos[i].price_month,alumnos[i].type_cuota),status:'pending',id_pagos_tic:responsePTic.id,usuario:'tic',metodo:'pagos-tic-1'});
            } 
        }
       // return arrayMailOptions;
    } catch (error) {
        console.error("Error makeing array mail Options :"+error);
    }
}
controller.toMakeArrayMailOptionsMayo = async ( req , res ) => {
    try {
        const alumnos = await alumnosModel.getAllAlumnosNotPayed('2025');
        const arrayMailOptions = [];
        const arrayObjectPayerAndAmount = [];
        console.log(alumnos.length); 
        if( alumnos.length>0){
            for (let i = 0; i < alumnos.length; i++){
                arrayObjectPayerAndAmount.push(controller.toMakeObjectPayerAndAmount(alumnos[i]));
                const responsePTic = await controller.toMakeLinkCuota(controller.toMakeObjectPayerAndAmount(alumnos[i]));
         //       const mailOptions = controller.toMakeMailOptions(alumnos[i].email,alumnos[i].id,responsePTic.form_url);
           //     arrayMailOptions.push(mailOptions);
                await cuotasModel.insertCuota({alumno_id:alumnos[i].id,mes:'mayo',monto:controller.toGetAmount(alumnos[i].price_month,'second-time'),status:'pending',id_pagos_tic:responsePTic.id,usuario:'tic',metodo:'pagos-tic'});
            } 
        }
       // return arrayMailOptions;
    } catch (error) {
        console.error("Error makeing array mail Options :"+error);
    }
}
controller.toMakeArrayMailOptionsJunio = async ( req , res ) => {
    try {
        const alumnos = await alumnosModel.getAllAlumnosNotPayed('2025');
        const arrayMailOptions = [];
        const arrayObjectPayerAndAmount = [];
        console.log(alumnos.length); 
        if( alumnos.length>0){
            for (let i = 0; i < alumnos.length; i++){
                arrayObjectPayerAndAmount.push(controller.toMakeObjectPayerAndAmount(alumnos[i]));
                const responsePTic = await controller.toMakeLinkCuota(controller.toMakeObjectPayerAndAmount(alumnos[i]));
         //       const mailOptions = controller.toMakeMailOptions(alumnos[i].email,alumnos[i].id,responsePTic.form_url);
           //     arrayMailOptions.push(mailOptions);
                await cuotasModel.insertCuota({alumno_id:alumnos[i].id,mes:'julio',monto:controller.toGetAmount(alumnos[i].price_month,alumnos[i].type_cuota),status:'pending',id_pagos_tic:responsePTic.id,usuario:'tic',metodo:'pagos-tic'});
            } 
        }
       // return arrayMailOptions;
    } catch (error) {
        console.error("Error makeing array mail Options :"+error);
    }
}


controller.toGetAmount = ( amount , type ) => {
    try {
        if(amount && type ){
            switch ( type ) {
                case 'type1':
                    return parseFloat(amount);
                case 'type2':
                    return parseFloat(amount)*0.93;
                case 'type3':
                    return parseFloat(amount)*0.5;
                case 'second-time':
                    return parseFloat(amount)*1.1;
                default:
                    break;
            }  
        }
    } catch (error) {
        console.error("Error making amount :"+error);
    }
}

/**
 * Function to make trasporter
 * @returns Objet to send email
 */
controller.toMakeTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true, // true for port 465
        auth: {
            user: FROM,
            pass: APP_PASSWORD // Consider using an App Password here
        },
        tls: {
            // Additional TLS options if needed
            rejectUnauthorized: false // Only use this for testing, not production!
        }
    });
};

controller.toSendEmails = async (transporter, arrMailOptions) => {
    try {
        for (let index = 0; index < arrMailOptions.length; index++) {
            try {
                const info = await transporter.sendMail(arrMailOptions[index]);
                console.log('Correo Enviado:', info);
            } catch (error) {
                console.error('Error al enviar correo:', error.message || error);
            }
        }
    } catch (error) {
        console.error('Error inesperado:', error);
    }
};
controller.toMakeLinkCuota = async (oToSend) => {
    try {
        const token = await authController.getTokenBackend();
        const response = await authController.getFormPay(oToSend,token);
        console.log(response)
        return response;
    } catch (error) {
        console.error("Error in toMakeLinkCuota:", error);
    }
};
controller. toMakeObjectPayerAndAmount = ( alumno ) => {
    try {
        const amount = controller.toGetAmount(alumno.price_month,alumno.type_cuota);// alumno.price_month;//
        const objectPayer = {};
        const identification = {}
            objectPayer.name = (alumno.firstName || '') + ' ' + (alumno.lastName || '').trim();
            objectPayer.email = alumno.email;//'chavezzsilvio@gmail.com';//
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
    const marchDate = new Date(year,6,16);
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

controller.getAllCuotasByAllAlumnos = async ( req , res ) => {
    try {
        const rows = await cuotasModel.getAllCuotasByAllAlumnos('2025');
        res.status(201).json(rows)
    } catch (error) {
        console.error(error);
    }
}
controller.getAllCuotas = async ( req , res ) => {
    try {
        const rows = await cuotasModel.getAllCuotas();
        res.status(201).json(rows);
    } catch (error) {
        console.error("Error fetching all Cuotas :"+error.message);
    }
}
controller.getAllCuotasAbril = async ( req , res ) => {
    try {
        const rows = await cuotasModel.getAllCuotasAbril();
        res.status(201).json(rows);
    } catch (error) {
        console.error("Error fetching all Cuotas :"+error.message);
    }
}
controller.getAllCuotasMarzo = async ( req , res ) => {
    try {
        const rows = await cuotasModel.getAllCuotasMarzo();
        res.status(201).json(rows);
    } catch (error) {
        console.error("Error fetching all Cuotas :"+error.message);
    }
}
controller.getAllCuotasMayo = async ( req , res ) => {
    try {
        const rows = await cuotasModel.getAllCuotasMayo();
        res.status(201).json(rows);
    } catch (error) {
        console.error("Error fetching all Cuotas :"+error.message);
    }
}
controller.getAllCuotasJunio = async ( req , res ) => {
    try {
        const rows = await cuotasModel.getAllCuotasJunio();
        res.status(201).json(rows);
    } catch (error) {
        console.error("Error fetching all Cuotas :"+error.message);
    }
}
controller.getAllCuotasJulio = async ( req , res ) => {
    try {
        const rows = await cuotasModel.getAllCuotasJulio();
        res.status(201).json(rows);
    } catch (error) {
        console.error("Error fetching all Cuotas :"+error.message);
    }
}
controller.getAllCuotasByMonth = async ( req , res ) => {
    try {
        const rows = await cuotasModel.getAllCuotasByMonth();
        res.status(201).json(rows);
    } catch (error) {
        console.error("Error fetchin all cuotas by month :"+error.message);
    }
}
controller.toCheckAllPayCuotas = async ( req , res ) => {
    try {
        const rows = await cuotasModel.getAllCuotasMarzo();
        for (let i = 0; i < rows.length; i++) {
               const status = await authController.toCheckPayBackend(rows[i].id_pagos_tic);
               console.log(status);
               if(status === 'approved') await cuotasModel.updateStatus(rows[i].id,'pagado'); 
               if(status === 'cancelled') await cuotasModel.updateStatus(rows[i].id,'cancelado'); 
        }
    } catch (error) {
        console.error(error);
    }
}
controller.toCheckAllPayCuotasAbril = async ( req , res ) => {
    try {
        const rows = await cuotasModel.getAllCuotasAbrilNotAprobed();
        for (let i = 0; i < rows.length; i++) {
               const status = await authController.toCheckPayBackend(rows[i].id_pagos_tic);
               console.log(status);
               if(status === 'approved') await cuotasModel.updateStatus(rows[i].id,'pagado'); 
               if(status === 'cancelled') await cuotasModel.updateStatus(rows[i].id,'cancelado'); 
               if(status === 'overdue') await cuotasModel.updateStatus(rows[i].id,'vencido');


        }
    } catch (error) {
        console.error(error);
    }
}
controller.toCheckAllPayCuotasByMonth = async ( req , res ) => {
    try {
        const { month } = req.params;
        let rows = [];
        month?rows = await cuotasModel.getAllCuotasNotAprobed(month):rows = [];
        for (let i = 0; i < rows.length; i++) {
               const status = await authController.toCheckPayBackend(rows[i].id_pagos_tic);
               console.log(status);
               if(status === 'approved') await cuotasModel.updateStatus(rows[i].id,'pagado'); 
               if(status === 'cancelled') await cuotasModel.updateStatus(rows[i].id,'cancelado'); 
               if(status === 'overdue') await cuotasModel.updateStatus(rows[i].id,'vencido');


        }
    } catch (error) {
        console.error(error);
    }
}
controller.toGetAlumnosNotPayed = async ( req , res ) => {
    try {
        const { month } = req.params;
        let rows=[];
        if( month ){
         rows = await cuotasModel.getAlumnosNotPayed(month); 
        } else {
         rows = await cuotasModel.getAlumnosNotPayed('abril'); 
        }
        
        res.json(rows)    
    } catch (error) {
        console.error(error);
    }
}
/**
 * Function to update status of cuota by id
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
controller.updateStatusById = async (req, res) => {
    try {
        const { idCuota } = req.params;
        const { newStatus } = req.body;
        const validStatus = ['pending','cancelado','vencido'];
        if (isNaN(idCuota) || !validStatus.includes(newStatus.trim()) ) {
            return res.status(400).json({ 
                success: false,
                message: "Both idCuota (number) and newStatus (string) are required." 
            });
        }
        const updatedRows = await cuotasModel.updateStatus(idCuota, newStatus.trim());
        if (updatedRows === 0) {
            return res.status(404).json({ 
                success: false,
                message: "No quota found with the provided ID." 
            });
        }
        res.status(200).json({ 
            success: true,
            message: "Quota status updated successfully.",
            data: { idCuota, newStatus }
        });
    } catch (error) {
        console.error("Error updating quota status:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: error.message 
        });
    }
};
/**
 * Function to calculate average by month
 * @param {Object} req 
 * @param {Object} res 
 */
controller.getAverageByMonth = async ( req , res ) => {
    try {
        const { month } = req.params;
        const result = await cuotasModel.getAverageByMonth(month);
            res.status(201).json(result);
    } catch (error) {
        console.error("Error calculating average :"+error);
    }
}
/**
 * Function to calculate average by day
 * @param {Object} req 
 * @param {Object} res 
 */
controller.getAverageByToday = async ( req , res ) => {
    try {
        const result = await cuotasModel.getAverageByToday();
            res.status(201).json(result);
    } catch (error) {
        console.error("Error calculating average :"+error);
    }
}
/**
 * Function to calculate suma of cuotas
 * @param {Object} req 
 * @param {ObJect} res 
 */
controller.getSumToday = async ( req , res ) => {
    try {
        const result = await cuotasModel.getSumaCuotasByToday();
            res.status(201).json(result);
    } catch (error) {
        console.error("Error calculating suma :", error);
    }
}
/**
 * Function to calculate suma of cuotas by month
 * @param {Object} req 
 * @param {ObJect} res 
 */
controller.getSumByMonth = async ( req , res ) => {
    try {
        const { month } = req.params;
        const result = await cuotasModel.getSumCuotasByMonth(month);
            res.status(201).json(result);
    } catch (error) {
        console.error("Error calculating suma by month :", error);
    }
}
/**
 * Function to get sum of cuotas by the last week
 * @param {Object} req 
 * @param {Object} res 
 */
controller.getSumByLastWeek = async ( req , res ) => {
    try {
        const result = await cuotasModel.getSumaCuotasByLastWeek();
            res.status(201).json(result);
    } catch (error) {
        console.error("Error calculating sum by the last week :",error);
    }
} 
/**
 * Function to get the sum by the last week and users
 * @param {Object} req 
 * @param {Object} res 
 */
controller.getSumByLastWeekByUser = async ( req , res ) => {
    try {
        const result = await cuotasModel.getSumCuotasByLastWeekAndUsers();
            res.status(201).json(result);
    } catch (error) {
        console.error("Error fetching suma by the last week :", error);
    }
}
/**
 * Function that is fetching all cuotas by alumnoId
 * @param {Object} req 
 * @param {Object} res 
 */
controller.getAllCuotasPayedByIdAlumno = async ( req , res ) => {
    try {
        const { idAlumno } = req.params;
        const result = await cuotasModel.getCuotasByMonthByIdAlumno(idAlumno);
            res.status(200).json(result);
    } catch (error) {
        console.error(`Error fetchin all cuotas payed by alumno_id`, error);
    }
}
/**
 * Function that create an link of pagosTic by alumnoId and Month
 * Falta la parte de mes
 * y definir dias de duracion y valor de interes;
 * @param {Object} req 
 * @param {Object} res 
 */
controller.toMakeOneLink = async ( req , res ) => {
    try {
        const { idAlumno , month } = req.params;
        console.log(idAlumno);
        if( isNaN(idAlumno) || !idAlumno ) throw new Error("The idAlumno is necesary!");
        const alumno = await alumnosModel.getAlumnoNotPayedById(idAlumno);
        console.log(alumno[0]);
        const objToSend = controller.toMakeObjectPayerAndAmount(alumno[0]);
        console.log(objToSend);
        const responsePTic = await controller.toMakeLinkCuota(controller.toMakeObjectPayerAndAmount(alumno[0]))
        console.log(responsePTic);
    } catch (error) {
        console.error('Error making cuota by id :',error);
    }
}
controller.App = async ( req , res ) => {
    try {
        const transporter = controller.toMakeTransporter();
        const arrayMailOptions =  await controller.toMakeArrayMailOptionsAbril();
        console.log(arrayMailOptions);
        controller.toSendEmails(transporter,arrayMailOptions);
    } catch (error) {
        console.error(error);
    }
}
export default controller;