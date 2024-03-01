const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
require("dotenv").config();
const client = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const sendEmail = async () => {
  try {
    const params = {
      Destination: {
        ToAddresses: ["rishabh.kumar@dotsquares.com"],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: "Hello, this is a test email!",
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Test email",
        },
      },
      Source: "rishabhkumar.iuj@gmail.com",
    };
    const data = await client.send(new SendEmailCommand(params));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.error(err, err.stack);
  }
};

sendEmail();
