require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/contato', async (req, res) => {
    const { name, phone, email, specialty, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', // ou outro serviço SMTP
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const mailOptions = {
        from: `"Site Clínica" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `📩 Novo contato de ${name}`,
        text: `
Novo contato pelo site:

👤 Nome: ${name}
📞 Telefone: ${phone}
📧 E-mail: ${email}
🎯 Especialidade: ${specialty || "Não informada"}
💬 Mensagem:
${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao enviar mensagem.', error });
    }
});

app.listen(3000, () => {
    console.log('✅ Servidor rodando na porta 3000');
});