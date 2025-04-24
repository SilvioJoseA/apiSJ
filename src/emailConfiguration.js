import nodemailer from 'nodemailer';
import { APP_PASSWORD, FROM } from './config.js';

// Configura el transporter (puedes usar Gmail, Outlook, etc.)
const transporter = nodemailer.createTransport({
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

// Configura el contenido del correo electrónico
const mailOptions = {
    from: 'cuotas@sistemasaintjohns.com.ar', // Remitente
    to: 'chavezzsilvio@gmail.com', // Destinatario
    subject: 'Prueba 1', // Asunto
    text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
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
    <p>  Cuota Mes de Abril </p>
    <p>Espero que este mensaje le encuentre bien.</p>
    <p>A continuación, puede acceder al botón de pago para la cuota del mes en curso:</p>
            <ul>
                <li><strong>1° vencimiento:</strong> 10 de cada mes</li>
                <li><strong>2° vencimiento:</strong></li>
            </ul>
      
            <a href="https://servicios.paypertic.com/formularios/v2/pagos/14834dba-0d96-474a-ba5e-bb5be4fa7eb1" class="button">Pagar</a>
            <p>Quedamos a disposición ante cualquier consulta.</p>
            <p>¡Saludos cordiales y que tenga un excelente mes!</p>
            <div class="footer">
                <p>Atentamente,</p>
                <p>Saint John's</p>
            </div>
        </div>
    </body>
    </html>`
};// https://sistemasaintjohns.com.ar/Formulario/pagos.html?name=Silvio&lastName=Chavez&dni=4323423&email=chavezzsilvio@gmail.com&id_alumno=1232&amount=32000
 
const arrMailOptions = [
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzdfgsfdsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvi45645645645o@gmail.com', // Remitente
        to: 'chavezzsdfgsfdilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilv45645645675675io@gmail.com', // Remitente
        to: 'chavezzssdfgsfdsgfdilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvi5464564645o@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
    {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },   {
        from: 'chavezzsilvio5464564@gmail.com', // Remitente
        to: 'chavezzsilvio@gmail.com', // Destinatario
        subject: 'Prueba 1', // Asunto
        text: 'Este es el contenido del correo en texto plano.', // Cuerpo del correo en texto plano
        html: `
        https://sistemasaintjohns.com.ar/Formulario/pagos.html
        ` // Cuerpo del correo en HTML
    },
];
const toSendEmails = async (transporter, mailOptions) => {
    try {
        for (let i = 0; i < 100; i++) {
              const info = await transporter.sendMail(mailOptions); 
              console.log('Correo Enviado:', info.response);
        }
      
   //     for (let index = 0; index < arrMailOptions.length; index++) {
            // Usamos await para esperar a que el correo se envíe antes de continuar
   //         const info = await transporter.sendMail(arrMailOptions[index]);
           
     //   }
    } catch (error) {
        console.error('Error al enviar correo:', error);
    }
};

toSendEmails(transporter,mailOptions);