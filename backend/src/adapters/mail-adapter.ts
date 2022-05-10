export interface SendMailData {
  subject: string;
  text?: string;
  body: string;
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>;
}
