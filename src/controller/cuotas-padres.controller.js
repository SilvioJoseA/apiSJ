import alumnosModel from "../model/alumnos.model.js";
import cuotasModel from "../model/cuotas.model.js";
import cuotasController from "./cuotas.controller.js";
import authController from "./auth.controller.js";
const controller = {};

/**
 * Function get end numbers by price
 * @param {number} amount 
 * @param {string} type 
 * @returns 
 */
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
 * Function to make a link of cuota by id Alumno
 * @param {Object} req 
 * @param {Object} res 
 */
controller.toMakeLinkCuota = async ( req , res ) => {
    try {
        const { idAlumno , month } = req.params;
        const alumno = await alumnosModel.getAlumnoNotPayedById(idAlumno,month);
        const objectToSend = this.toMakeObjectPayerAndAmount(alumno);
        const responsePTic = await cuotasController.toMakeLinkCuota(objectToSend);
        await cuotasModel.insertCuota({alumno_id:alumno.id,mes:month,monto:controller.toGetAmount(alumno.price_month,alumno.type_cuota),status:'pending',id_pagos_tic:responsePTic.id,usuario:'tic',metodo:'pagos-tic'});              
    } catch (error) {
        console.error("Error making cuota : ",error);
    }
}
/**
 * Function to cancelled ticket
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
controller.toCancelLinkCuota = async ( req , res ) => await authController.cancelarPago( req ,res );
/**
 * Function to make Objecto to send at Pagos Tic
 * @param {Object} alumno 
 * @returns 
 */
controller.toMakeObjectPayerAndAmount = ( alumno ) => {
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
export default controller;