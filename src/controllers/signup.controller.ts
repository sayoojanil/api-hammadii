import {repository} from '@loopback/repository';
import {post, requestBody, HttpErrors} from '@loopback/rest';
import {service} from '@loopback/core';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {ResendService} from '../services/resend.service';

export class SignupController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    @service(ResendService)
    private resendService: ResendService,
  ) {}

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

      // ✅ Send welcome email after signup
      await this.resendService.sendSignupEmail(newUser.email, newUser.name);

      return newUser;
    } catch (error) {
      console.error('Error in signup:', error);
      throw error;
    }
  }

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

      // ✅ Send login notification email
      await this.resendService.sendLoginEmail(user.email, user.name);

      return user;
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  }
}
