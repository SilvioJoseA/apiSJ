import fetch from "node-fetch";
import qs from "querystring";
const controller = {};
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
  console.log("Token obtenido:", data.access_token);
  res.status(200).json(data.access_token);
}
export default controller;