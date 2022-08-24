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

    var body = resultImage,
      base64Data = body.replace(/^data:image\/png;base64,/,""),
      binaryData = new Buffer(base64Data, 'base64').toString('binary');
    var fileName = base64Data.replace(/[^A-Za-z0-9]/g, '').substr(72, 250);
    require("fs").writeFile(fileName + ".png", binaryData, "binary", function(err) {
      console.log(err); // writes out file without error, but it's not a valid image
    });

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

    const fName = fullName.split(' ')[0];
    var longString =
      "<html><body>\
          Dear " + fName + "<br><br>\
          Thank you for participating in Walk,Run, Ride,to the Moon to support Self-Help for the Elderly and celebrating Mid-Autumn Moon Festival with us. Your #walkrunride2moon photo from Snapluu is attached.<br>\
          Self-Help for the Elderly holds an annual walkathon near the date of the Autumn Moon Festival to celebrate unity and compassion.<br>\
          We wish everyone health, joy and peace in their daily life, less hate but more smiles.<br><br>\
          You are welcome to join Walk Run Ride to the Moon 2022 in-person walks and a virtual celebration:<br>\
          <ul>\
            <li>Longevity Walkathon in San Francisco Chinatown <u>on September 10, 2022</u></li>\
            <li>Autumn Moon Festival & San Mateo Center's 30th Anniversary Celebration in San Mateo Center Park <u>on September 17, 2022</u></li>\
            <li>#WalkRunRide2Moon Virtual Wrap-Up Party <u>on September 22, 2022</u></li>\
          </ul>\
          <br><br>\
          <p>Visit <a href='https://www.selfhelpelderly.org/'>selfhelpelderly.org</a> to learn more our resources, services, and events to help you or your loved one move forward towards happy and healthy living.</p>\
          <br><br>\
          <p>\
            Sincerely, <br>\
            Walk Run Ride to the Moon 2022<br>\
            @ Self-Help for the Elderly\
          </p>\
          <br>\
      </body></html>";

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
