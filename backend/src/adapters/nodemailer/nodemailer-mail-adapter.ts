import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "239669e7a984d7",
    pass: "e498be40ce9695",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    await transport.sendMail({
      from: "Equipe SolarCheck <feedback@solarcheck.com>",
      to: "Lucas Pedro Abreu <lucasp.abreu@gmail.com>",
      subject: data.subject,
      html: data.body,
    });
  }
}
