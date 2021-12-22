const express = require("express");
const bodyParser = require("body-parser");
const sendRouter = express.Router();
const nodemailer = require("nodemailer");

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const transport = {
  //all of the configuration for making a site send an email.

  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "youremail@email.com",
    pass: "1234567890",
  },
};

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
  if (error) {
    //if error happened code ends here
    console.error(error);
  } else {
    //this means success
    console.log("users ready to use");
  }
});

sendRouter.post("/send", urlencodedParser, (req, res, next) => {
  //make mailable object
  const mail = {
    from: "youremail@email.com",
    to: "emailto@email.com",
    subject: req.body.subject,
    text: `
      Hello from:
      ${req.body.email}`,
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});

module.exports = sendRouter;
