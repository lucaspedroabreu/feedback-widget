import { MailAdapter, SendMailData } from "../mail-adapter";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export class SendgridMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    const msg = {
      to: "lucasp.abreu@gmail.com",
      from: "lucasp.abreu@gmail.com", // Use the email address or domain you verified above
      subject: data.subject,
      text: data.text ?? data.body,
      html: data.body,
    };

    await sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
