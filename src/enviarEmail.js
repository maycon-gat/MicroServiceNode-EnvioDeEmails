const nodemailer = require('nodemailer');

module.exports = {
    async sendEmail(req, res) {

        const retornoJson = {};

        const remetente = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "maycon@carzen.com.br",
                pass: "rpz102030"
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const emailEnviado = {
            from: "maycon@carzen.com.br",
            to: "maycon.henrique.gat@gmail.com",
            subject: "Enviando Email com Node.js",
            text: "Estou te enviando este email com node.js",
        }

        const promise = new Promise((res, rej) => {

            remetente.sendMail(emailEnviado, async function (error, info) {
                if (error) {
                    retornoJson["erro"] = `${error}`;
                    rej(retornoJson)
                } else {
                    retornoJson["info"] = `${info.response}`;
                    res(retornoJson)
                }
            });
        })

        const responseEmail = await promise
            .then((r) => {
                return r
            })
        res.status(200).json(responseEmail)
    }
}