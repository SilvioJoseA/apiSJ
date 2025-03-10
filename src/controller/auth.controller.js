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