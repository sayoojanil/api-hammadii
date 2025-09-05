import {injectable, BindingScope} from '@loopback/core';
import {Resend} from 'resend';

@injectable({scope: BindingScope.TRANSIENT})
export class ResendService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY!);
  }

  async sendSignupEmail(to: string, username: string) {
    return this.resend.emails.send({
      from: 'no-reply@yourdomain.com',
      to,
      subject: 'Welcome to Shyamaprabha Admin 🎉',
      html: `<h2>Hello ${username},</h2>
             <p>Thank you for signing up at Shyamaprabha Admin!</p>
             <p>We’re excited to have you on board 🚀</p>`,
    });
  }

  async sendLoginEmail(to: string, username: string) {
    return this.resend.emails.send({
      from: 'no-reply@yourdomain.com',
      to,
      subject: 'Login Successful - Shyamaprabha Admin',
      html: `<h2>Hello ${username},</h2>
             <p>You have successfully logged in to Shyamaprabha Admin.</p>
             <p>If this wasn’t you, please reset your password immediately.</p>`,
    });
  }
}
