import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "676afeb4144f27",
        pass: "f56c9dce97eb6c"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({ subject, body }: SendMailData){
		await transport.sendMail({
			from: "Equipe Feedget <oi@feedget.com>",
			to: "Thomas Domingos <thomasdomingos@hotmail.com>",
			subject,
			html: body
		});
	}
}