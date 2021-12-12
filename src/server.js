const express = require('express');
const { sendEmail } = require('./enviarEmail');
const server = express();

server.use(express.json());

server.listen(3333, () => { console.log(`Servidor rodando em: http://localhost:3333`) });

server.post("/send", sendEmail);