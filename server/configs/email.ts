import nodemailer from "nodemailer";
import { google } from "googleapis";
import Mail from "nodemailer/lib/mailer";

let transport: Mail | null = null;

async function setup() {
  let OAuth2 = google.auth.OAuth2;
  let oauth2Client = new OAuth2(
    process.env.GCP_CLIENT_ID,
    process.env.GCP_CLIENT_SECRET,
    "https://ptudw-17tn-nhom13.herokuapp.com/",
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GCP_REFRESH_TOKEN,
  });

  let { token: accessToken } = await oauth2Client.getAccessToken();
  transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "lamnhh.test@gmail.com",
      clientId: process.env.GCP_CLIENT_ID,
      clientSecret: process.env.GCP_CLIENT_SECRET,
      refreshToken: process.env.GCP_REFRESH_TOKEN,
      accessToken,
    },
  });
}

export default { setup };

export type MailOptions = {
  to: string;
  subject: string;
  html: string;
};

export function sendEmail(options: MailOptions) {
  let mail = {
    from: "lamnhh.test@gmail.com",
    to: options.to,
    subject: options.subject,
    generateTextFromHTML: true,
    html: options.html,
  };
  return new Promise(function (resolve, reject) {
    if (!transport) {
      reject(new Error("Lỗi hệ thống"));
      return;
    }
    transport.sendMail(mail, function (err, response) {
      if (err) {
        reject(err);
      } else {
        transport.close();
        resolve(response);
      }
    });
  });
}
