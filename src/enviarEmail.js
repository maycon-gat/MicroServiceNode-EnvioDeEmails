let nodemailer = require('nodemailer');
let fs = require('fs');
let path = require("path");


module.exports = {
    async sendEmail(req, res) {

        let htmlFile = new Promise((resolve, reject) => {

            fs.readFile(path.resolve(req.file.destination, req.file.filename), 'utf-8', function (err, html) {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            })
        })

        htmlFile.then(async (html) => {


            let remetente = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORTA_SMTP,
                secure: false,
                auth: {
                    user: process.env.EMAIL_LOGIN,
                    pass: process.env.EMAIL_SENHA
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            let emailEnviado = {
                from: process.env.EMAIL_LOGIN,
                to: "emailqualquer@gmail.com",
                subject: "Enviando Email com Node.js",
                html: html,
            }

            let enviarEmail = new Promise((resolve, reject) => {

                let retornoJson = {};

                remetente.sendMail(emailEnviado, async function (error, info) {
                    if (error) {
                        retornoJson["erro"] = `${error}`;
                        reject(retornoJson)
                    } else {
                        retornoJson["info"] = `${info.response}`;
                        resolve(retornoJson)
                    }
                });
            })

            await enviarEmail
                .then((responseEmail) => {
                    res.status(200).json(responseEmail)
                })
                .catch((erro) => {
                    res.status(400).json(erro)
                })
        })

    }
}