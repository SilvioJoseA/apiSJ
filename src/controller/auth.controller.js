import fetch from "node-fetch";
import qs from "querystring";
const controller = {};
/**
 * Function to get token of pagos TIC
 * @param {Object} req 
 * @param {Object} res 
 */
controller.getToken = async ( req , res ) => {
    const body = qs.stringify({ 
        grant_type: "password",
        username: "DY4jcnNHwBzj7Bg6",
        password: "MreBw8zhHs55kBy3",
        client_id: "16465308-1844-4abe-abe6-f184149ee740",
        client_secret: "a2d03fa3-f6c4-45e5-9792-dc0d8b51a25c",
    });
    const response = await fetch(
        "https://a.paypertic.com/auth/realms/entidades/protocol/openid-connect/token",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
        }
    );
    const data = await response.json();
  //console.log("Token obtenido:", data.access_token);
  res.status(200).json(data.access_token);
}
controller.getTokenBackend = async () => {
    const body = qs.stringify({ 
        grant_type: "password",
        username: "DY4jcnNHwBzj7Bg6",
        password: "MreBw8zhHs55kBy3",
        client_id: "16465308-1844-4abe-abe6-f184149ee740",
        client_secret: "a2d03fa3-f6c4-45e5-9792-dc0d8b51a25c",
    });
    const response = await fetch(
        "https://a.paypertic.com/auth/realms/entidades/protocol/openid-connect/token",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
        }
    );
    const data = await response.json();
  return (data.access_token);
}
controller.getFormPay = async ( objectoToSend , token ) => {
    try {
        const body = JSON.stringify(objectoToSend);
        console.log(body);
        const response = await fetch("https://api.paypertic.com/pagos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: body
            }
            );
            const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro sendig oToSend :"+error);
    }

}
/**
 * To Check status of pagos tic
 * @param {String} id_pagos_tic 
 * @returns 
 */
controller.toCheckPay = async ( req , res  ) => {
    try { 
        const {id_pagos_tic} = req.params;
        console.log(id_pagos_tic);
        const token = await controller.getTokenBackend();
        console.log(token);
        if(id_pagos_tic){   
            const response = await fetch("https://api.paypertic.com/pagos/"+id_pagos_tic, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`     
            },
            }
            );
            if ( response.ok ){
                const data = await response.json(); 
                res.status(201).json(data.status); 
            }
            res.json("Not Valid")

            
        }
    } catch (error) {
        console.error("Error checking pay by id_pagos_tic : "+error);
    }
} 
/**
 * Cancelar pago de pagos tic
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
controller.cancelarPago = async ( req , res ) => {
    try {
        const { id_pagos_tic } = req.params;
        console.log(id_pagos_tic);
        const token = await controller.getTokenBackend();
        console.log(token);
        if(id_pagos_tic){   
            const response = await fetch("https://api.paypertic.com/pagos/cancelar/"+id_pagos_tic, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`     
            },
            body: JSON.stringify({
   "status_detail": "Pago cancelado por solicitud del pagador"
}),
            }
            );
            if ( response.ok ){
                const data = await response.json(); 
                res.status(201).json(data.status); 
            }
            res.json(response);
            return 0;
        } 
    } catch (error) {
        console.error("Error al cancelar pago :"+error);        
    }
}
controller.cancelarPagoBackend = async ( id_pagos_tic ) => {
    try {
        console.log(id_pagos_tic);
        const token = await controller.getTokenBackend();
            const response = await fetch("https://api.paypertic.com/pagos/cancelar/"+id_pagos_tic, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`     
            },
            body: JSON.stringify({"status_detail": "Pago cancelado por solicitud del pagador"}),
            }
            );
            res.status(201).json(response); 
    } catch (error) {
        console.error("Error al cancelar pago :"+error);        
    }
}
//SELECT * FROM cuotas_2025 INNER JOIN alumnos_2025 AS alumnos ON alumnos.id = cuotas_2025.alumno_id WHERE cuotas_2025.mes = 'julio' AND alumnos.nivel = '5° AÑO';
/**
 * To Check status of pagos tic
 * @param {String} id_pagos_tic 
 * @returns 
 */
controller.toCheckPayBackend = async ( id_pagos_tic ) => {
    try { 
        console.log(id_pagos_tic);
        const token = await controller.getTokenBackend();
        if(id_pagos_tic){   
            const response = await fetch("https://api.paypertic.com/pagos/"+id_pagos_tic, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`     
            },
            }
            );
            if ( response.ok ){
                const data = await response.json(); 
              //  console.log(data.status); 
                return data.status;
            }
            console.log("Not Valid")

            
        }
    } catch (error) {
        console.error("Error checking pay by id_pagos_tic : "+error);
    }
} 
controller.toMakeBodyTIC = (bodyForm) => {
    const objectoToSend = {};
    const objectPayer = {};
    const objectDetails = {
        external_reference: "98725",
        concept_id: "920",
        concept_description: "Pago de Inscripción",
        notification_url: "https://backend.acsaintjohns.org/pagos",
        amount : 10,
    };
    if (bodyForm) {
        objectPayer.name = bodyForm.name || "name";
        objectPayer.email = bodyForm.email || "user@example.com";
        objectPayer.identification = {
            type: bodyForm.identification_type || "DNI_ARG",
            number: bodyForm.identification_number || "1111111",
            country: bodyForm.country || "ARG"
        }; 
        objectoToSend.external_transaction_id = objectPayer.name + '_' + objectPayer.identification.number + '_' + new Date().getTime() || 'name'+'_'+'1111111'+'_'+new Date().getTime() ;
    } 
    objectoToSend.currency_id = "ARS";
    objectoToSend.due_date = getLocalDateWithOffset(new Date());
    objectoToSend.details = [objectDetails];
    objectoToSend.payer = objectPayer;

    return objectoToSend;
}   
export default controller;