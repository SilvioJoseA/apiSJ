import fetch from "node-fetch";
import qs from "querystring";
import qs1 from "qs";
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
controller.toCheckPay = async ( id_pagos_tic  ) => {
    try { 
        const token = await controller.getToken();
        if(id_pagos_tic){
            console.log(id_pagos_tic);
            const response = await fetch("https://api.paypertic.com/pagos/"+"9936a264-9558-4574-9a45-1cafd79e2650"/*id_pagos_tic*/, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLdnB0T0R6RXdlQUp4LXZVWDc1NFJWVnFlak51NGwtTXUxUE9UbVB4Q1dBIn0.eyJleHAiOjE3NDE5ODYyOTUsImlhdCI6MTc0MTk4MzI5NSwianRpIjoiODUyYzc3NjAtMmYyMC00YmUzLWIzNDQtMjIzODc4ZGI3M2NhIiwiaXNzIjoiaHR0cHM6Ly9hLnBheXBlcnRpYy5jb20vYXV0aC9yZWFsbXMvZW50aWRhZGVzIiwic3ViIjoiZDE4ZjQ4MmYtMjFiNy00MzQ4LTg3NTMtZTNhYTkxM2VkNjQ4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiMTY0NjUzMDgtMTg0NC00YWJlLWFiZTYtZjE4NDE0OWVlNzQwIiwic2Vzc2lvbl9zdGF0ZSI6ImI2Zjc1Y2E3LWI1ZmMtNDA3NC1iNjgzLTc5ZjE3MjEyOGYyYSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IjE2NDY1MzA4LTE4NDQtNGFiZS1hYmU2LWYxODQxNDllZTc0MCI6eyJyb2xlcyI6WyJleHBvcnQtc2VhcmNoIiwiZXhwb3J0LXNob3ciLCJhcGktdXNlciIsInVtYV9wcm90ZWN0aW9uIiwiZXhwb3J0LWNyZWF0ZSIsImJhc2UtdXNlciJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJzaWduYXR1cmUiOiI4NjQxIiwibmFtZSI6IkFTT0NJQUNJT04gQ0lWSUwgREUgQ1VMVFVSQSBTQUlOVCBKT0hOJ1MgODY0MSIsInByZWZlcnJlZF91c2VybmFtZSI6ImR5NGpjbm5od2J6ajdiZzYiLCJnaXZlbl9uYW1lIjoiQVNPQ0lBQ0lPTiBDSVZJTCBERSBDVUxUVVJBIFNBSU5UIEpPSE4nUyIsImZhbWlseV9uYW1lIjoiODY0MSJ9.qnfiJUigQXhs6ddQhZ-KiLDuLSuwpqG1upCPalyuSX2Ktbx9XDuh5WwlaprlvTX0ty7UqZMG4FJlVGt_2JiV-GIpnHB2uR2K1qSFiWfEFrTafZLvrFE4fQ_BGD-MsG9JfQadVYKrDdqIyGkw9LqtJ_sHNEtu0oLgu5Tat75-lmtkN5qeq2UwFuTli-WiA1srKgDchJw122LSAL_5_bHBRKlkUNUgTn0oU1bcI1uQUZfORKA8PKl685F4Q0jy7EyX5Xj-qaL848xjL3-liQNgiKzadKksjSe9yVw6DKSJ5bSTLBEX8g2VDZTx1yYTM6XZzGPoCvPJX_8bOv6l9xnGMg`
            },
            }
            );
            console.log(response);
            return response;
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