import {repository} from '@loopback/repository';
import {post, requestBody, HttpErrors} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import * as nodemailer from 'nodemailer';

export class SignupController {
  private transporter: nodemailer.Transporter;

  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {
    // Initialize nodemailer transporter with Gmail
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sayoojanil977@gmail.com', // Replace with your email
        pass: 'awzz bcsc frqg uvdl',     // Replace with your Gmail App Password
      },
    });
  }

  // Send professional security warning email with stylish HTML template
  async sendWarningEmail(action: string, email: string): Promise<void> {
    const currentDate = new Date().toLocaleString();
    const actionType = action.toUpperCase();

    const mailOptions = {
      from: 'sayoojanil977@gmail.com',
      to: 'sayoojanil977@gmail.com', // Admin email
      subject: `SECURITY ALERT: ${actionType} Activity Detected`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Security Alert</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #b30000ff 0%, #b30000 100%); padding: 20px; border-radius: 15px; }
    .header { text-align: center; padding: 30px 0; background: rgba(255, 255, 255, 0.15); border-radius: 10px; margin-bottom: 20px; backdrop-filter: blur(10px); }
    .header h1 { color: #fff; font-size: 28px; margin-bottom: 10px; text-shadow: 2px 2px 6px rgba(0,0,0,0.4); }
    .header .icon { font-size: 45px; margin-bottom: 15px; }
    .content { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 10px 30px rgba(255,0,0,0.3); }
    .alert-banner { background: linear-gradient(45deg, #ff1a1a, #b30000); color: white; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 25px; font-weight: bold; font-size: 18px; text-transform: uppercase; box-shadow: 0 4px 12px rgba(179,0,0,0.4); }
    .details-card { background: #fff5f5; border-left: 4px solid #ff4d4d; padding: 20px; border-radius: 8px; margin-bottom: 25px; }
    .detail-item { display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #f1c0c0; }
    .detail-label { font-weight: 600; color: #8b0000; }
    .detail-value { color: #212529; font-weight: 500; }
    .action-section { background: #ffe6e6; border: 1px solid #ffcccc; border-radius: 8px; padding: 20px; margin: 25px 0; }
    .action-title { color: #a30000; font-weight: bold; margin-bottom: 15px; font-size: 16px; }
    .action-steps { list-style: none; padding-left: 0; }
    .action-steps li { padding: 8px 0; padding-left: 25px; position: relative; color: #a30000; }
    .action-steps li:before { content: "⚠️"; position: absolute; left: 0; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ffcccc; color: #8b0000; font-size: 14px; }
    .logo { color: #b30000; font-weight: bold; font-size: 18px; margin-bottom: 10px; }
    .urgency-badge { display: inline-block; background: #b30000; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-left: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="icon">🚨</div>
      <h1>Security Alert Notification</h1>
      <p style="color: rgba(255,255,255,0.85);">Shyamaprabha Admin Security System</p>
    </div>
    <div class="content">
      <div class="alert-banner">
        ⚠️ ${actionType} ACTIVITY DETECTED
        <span class="urgency-badge">HIGH PRIORITY</span>
      </div>
      <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">Dear <strong>Admin</strong>,</p>
      <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
        This is an automated security notification from the <strong>Shyamaprabha Admin System</strong>.
        A recent <strong>${actionType}</strong> attempt has been detected and requires your attention.
      </p>
      <div class="details-card">
        <h3 style="color: #a30000; margin-bottom: 15px;">📋 Activity Details</h3>
        <div class="detail-item"><span class="detail-label">Action Type:</span><span class="detail-value" style="color: #b30000; font-weight: bold;">${actionType}</span></div>
        <div class="detail-item"><span class="detail-label">User Email:</span><span class="detail-value">${email}</span></div>
        <div class="detail-item"><span class="detail-label">Date & Time:</span><span class="detail-value">${currentDate}</span></div>
        <div class="detail-item"><span class="detail-label">Status:</span><span class="detail-value" style="color: #28a745; font-weight: bold;">Completed Successfully</span></div>
      </div>
      <div class="action-section">
        <div class="action-title">🚨 Required Actions</div>
        <p style="color: #a30000; margin-bottom: 15px;">
          If this activity was authorized by you, no further action is required.
          However, if you did <strong>not</strong> authorize this activity, please take immediate action:
        </p>
        <ul class="action-steps">
          <li>Review the account activity and access logs</li>
          <li>Reset the associated credentials and passwords</li>
          <li>Notify the security team for further investigation</li>
          <li>Check for any suspicious system activities</li>
        </ul>
      </div>
      <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
        Your prompt attention to this matter will help ensure the continued security of your system.
      </p>
      <div class="footer">
        <div class="logo">Shyamaprabha Admin Security System</div>
        <p>This is an automated message. Please do not reply to this email.</p>
        <p style="font-size: 12px; color: #a30000; margin-top: 10px;">Stay Alert | Stay Secure | Stay Protected</p>
      </div>
    </div>
  </div>
</body>
</html>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Stylish warning email sent for ${action} to admin`);
    } catch (error: any) {
      console.error('❌ Error sending warning email:', error.message);
    }
  }

  // Signup route
  @post('/signup')
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {type: 'string'},
              email: {type: 'string'},
              password: {type: 'string'},
            },
            required: ['name', 'email', 'password'],
          },
        },
      },
    })
    userData: Omit<User, 'id'>,
  ): Promise<User> {
    try {
      const existing = await this.userRepository.findOne({
        where: {email: userData.email},
      });
      if (existing) {
        throw new HttpErrors.BadRequest('User already exists');
      }

      const newUser = await this.userRepository.create(userData);

      // Fire and forget email (don’t block signup response)
      this.sendWarningEmail('signup', userData.email).catch(err =>
        console.error('Email error:', err),
      );

      return newUser;
    } catch (error) {
      console.error('Error in signup:', error);
      throw error;
    }
  }

  // Login route
  @post('/loginWithEmail')
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {type: 'string'},
              password: {type: 'string'},
            },
            required: ['email', 'password'],
          },
        },
      },
    })
    credentials: {email: string; password: string},
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {email: credentials.email},
      });

      if (!user || user.password !== credentials.password) {
        throw new HttpErrors.Unauthorized('Invalid Credentials');
      }

      // Fire and forget email (don’t block login response)
      this.sendWarningEmail('login', credentials.email).catch(err =>
        console.error('Email error:', err),
      );

      return user;
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  }
}
