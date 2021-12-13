const express = require('express');
const server = express();

require('dotenv').config('../.env');

const cors = require('cors');
const multer = require('multer');

const multerConfig = require('./utils/multerConfig');
const { sendEmail } = require('./enviarEmail');


server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.post("/send", multer(multerConfig).single('file'), sendEmail);

server.listen(process.env.SV_PORTA, () => { console.log(`Servidor rodando em: ${process.env.SV_HOST} ${process.env.SV_PORTA}`) });
