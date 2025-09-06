import {repository} from '@loopback/repository';
import {post, requestBody, HttpErrors} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class SignupController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
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

      return user;
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  }
}
