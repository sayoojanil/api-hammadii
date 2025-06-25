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
              name: { type: 'string' },
              email: { type: 'string' },
              password: { type: 'string' },
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
        where: { email: userData.email },
      });
      if (existing) {
        throw new HttpErrors.BadRequest('User already exists');
      }
      return this.userRepository.create(userData);
    } catch (error) {
      console.error('Error in signup:', error); // Log the error
      throw error; // Re-throw to let LoopBack handle it
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
              email: { type: 'string' },
              password: { type: 'string' },
            },
            required: ['email', 'password'],
          },
        },
      },
    })
    credentials: { email: string; password: string },
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: credentials.email },
      });
      if (!user) {
        throw new HttpErrors.Unauthorized('Invalid email or password');
      }
      if (user.password !== credentials.password) {
        throw new HttpErrors.Unauthorized('Invalid email or password');
      }
      return user;
    } catch (error) {
      console.error('Error in login:', error); // Log the error
      throw error; // Re-throw to let LoopBack handle it
    }
  }
}
