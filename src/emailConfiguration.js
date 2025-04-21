import nodemailer from 'nodemailer';

// Configura el transporter (puedes usar Gmail, Outlook, etc.)
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // true for port 465
    auth: {
        user: 'cuotas@sistemasaintjohns.com.ar',
        pass: '74GateWay!' // Consider using an App Password here
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
    html: `
   https://sistemasaintjohns.com.ar/Formulario/pagos.html?name=Silvio&lastName=Chavez&dni=4323423&email=chavezzsilvio@gmail.com&id_alumno=1232&amount=32000
    ` // Cuerpo del correo en HTML
};
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
        const info = await transporter.sendMail(mailOptions);
   //     for (let index = 0; index < arrMailOptions.length; index++) {
            // Usamos await para esperar a que el correo se envíe antes de continuar
   //         const info = await transporter.sendMail(arrMailOptions[index]);
            console.log('Correo Enviado:', info.response);
     //   }
    } catch (error) {
        console.error('Error al enviar correo:', error);
    }
};

toSendEmails(transporter,mailOptions);