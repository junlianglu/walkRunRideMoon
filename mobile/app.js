// Importing express module
const express = require('express');
const app = express();

//app.use(express.json());
app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({limit: '50mb'}));
 
app.get('/nodeapp', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
 
app.post('/nodeapp', (req, res) => {
    var nodemailer = require('nodemailer');
    const smtpTransport = require('nodemailer/lib/smtp-transport')
    
    const { fullName, email, resultImage } = req.body;
    const { authorization } = req.headers;
    var transporter = nodemailer.createTransport(new smtpTransport({
        name: "snapluu.org",
        host: "162.240.17.201",
        port: 465,
        secure: true,
        auth: {
            user: "noreply@snapluu.org",
            pass: ",5526976Obob"
        },
        tls: {
          rejectUnauthorized: false
        }
    }));

    var longString = "<html><body>\
      Hi " + fullName + ",<br><br>\
      Thank you for celebrating Mid-Autumn Festival with our Self-Help for the Elderly virtual photobooth! Your photo is attached.<br><br>\
      As we celebrate the Autumn Festival, we reflect on the year passed and look ahead to boldly move forward into the new year.<br><br>\
      Self-Help for the Elderly wishes everyone joy, peace, and health in the new year. And to help you achieve these goals, Self-Help for the Elderly will be there every step of the way.<br><br>\
      Visit selfhelpelderly.org for a wealth of resources and services to help you move forward towards a fresh start to your new year.<br><br>\
      <p style='color:grey;'>Self-Help for the Elderly</p><br><br>";
    longString += "<img src='https://raw.githubusercontent.com/dexter5535576/walkRunRideMoon/main/email-logo.png'>";
    longString += "</body></html>";

    var mailOptions = {
      from: 'noreply@snapluu.org',
      to: email,
      subject: 'Self-Help for the Elderly',
      html: longString,
      attachments: [
        {   // data uri as an attachment
            path: resultImage
        },
        ]
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
     
    });
 
app.listen(3000, () => {
  console.log('Our express server is up on port 3000');
});