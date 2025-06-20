import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '@libs/dto/invitation/create-invitation.dto';
import * as nodemailer from 'nodemailer';

interface InvitationEmailData {
  to: string;
  invitationLink: string;
  role: UserRole;
}

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const isProd = process.env.NODE_ENV === 'production';

    const transportOptions: nodemailer.TransportOptions = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
      secure: isProd,
    };

    if (isProd) {
      transportOptions.auth = {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASSWORD'),
      };
    }

    this.transporter = nodemailer.createTransport(transportOptions);
  }

  async sendInvitationEmail(data: InvitationEmailData): Promise<void> {
    const { to, invitationLink, role } = data;

    const mailOptions = {
      from: 'noreply@example.com',
      to,
      subject: 'You have been invited to join our platform',
      html: `
        <h1>Welcome to our platform!</h1>
        <p>You have been invited to join as a ${role}.</p>
        <p>Click the link below to complete your registration:</p>
        <a href="${invitationLink}">Complete Registration</a>
        <p>This invitation link will expire in 24 hours.</p>
        <p>If you did not request this invitation, please ignore this email.</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
