

const express = require(`express`)

const nodemailer=require(`nodemailer`)

const router = express.Router();

const User = require("../models/user.model")

router.get("", async function (req, res) {

    const page = +req.query.page || 1    // this is the page number

    const size = +req.query.size || 10    // this is the size

    const offset = (page - 1) * size        // this is to skip the no of items

    const users = await User.find.lean().skip(offset).limit(size).exec()

    const totalUserCount = await User.find().countDocument()    // this is to fimd the total count of documents

    const totalPages = Math.ceil(totalUserCount / size)

     // Message configuration part
     var message = {
        from: "anup@masai.com",
        to: "pandey@school.com",
        subject: "Message title",
        text: "Plaintext version of the message",
        html: "<p>HTML version of the message</p>"
      };



      // Add the template of nodemailer transpor

     const transporter= nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "9b741b4d78ff69",
          pass: "2d7a1bed411316",
        },
      });


// Sending the mail
       transporter.sendMail(message)



    return res.send({ users, totalPages });
})

module.exports = router;