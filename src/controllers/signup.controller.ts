import {repository} from '@loopback/repository';
import {post, requestBody, HttpErrors} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';

export class SignupController {
  private transporter: nodemailer.Transporter;
  private JWT_SECRET = 'your_secret_key_here';

  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sayoojanil977@gmail.com',
        pass: 'awzz bcsc frqg uvdl', // Gmail App Password
      },
    });
  }

  // ---------------- EMAIL ALERT SYSTEM ----------------
  async sendWarningEmail(action: string, email: string): Promise<void> {
    const currentDate = new Date().toLocaleString();
    const actionType = action.toUpperCase();

    const mailOptions = {
      from: 'sayoojanil977@gmail.com',
      to: 'sayoojanil977@gmail.com',
      subject: `SECURITY ALERT: ${actionType} Activity Detected`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Security Alert: ${actionType}</h2>
          <p>User Email: <b>${email}</b></p>
          <p>Time: ${currentDate}</p>
          <p>This is an automated alert for your application.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Stylish warning email sent for ${action} to admin`);
    } catch (error: any) {
      console.error('Error sending warning email:', error.message);
    }
  }

  // ---------------- TOKEN GENERATION ----------------
  generateToken(user: User): string {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return jwt.sign(payload, this.JWT_SECRET, {expiresIn: '2h'});
  }

  // ---------------- SIGNUP ----------------
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
  ): Promise<{message: string; token: string}> {
    try {
      const existing = await this.userRepository.findOne({
        where: {email: userData.email},
      });
      if (existing) {
        throw new HttpErrors.BadRequest('User already exists');
      }

      const newUser = await this.userRepository.create(userData);
      const token = this.generateToken(newUser);

      this.sendWarningEmail('signup', userData.email).catch(console.error);

      //  Return only token with success message
      return {message: 'success', token};
    } catch (error) {
      console.error('Error in signup:', error);
      throw error;
    }
  }

  // ---------------- LOGIN ----------------
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
  ): Promise<{message: string; token: string}> {
    try {
      const user = await this.userRepository.findOne({
        where: {email: credentials.email},
      });

      if (!user || user.password !== credentials.password) {
        throw new HttpErrors.Unauthorized('Invalid Credentials');
      }

      const token = this.generateToken(user);

      this.sendWarningEmail('login', credentials.email).catch(console.error);

      return {message: 'success', token};
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  }
}
