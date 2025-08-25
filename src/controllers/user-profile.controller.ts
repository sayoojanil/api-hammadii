import { repository } from '@loopback/repository';
import { get, patch, param, requestBody, HttpErrors } from '@loopback/rest';
import { UserProfile, UserProfileRelations } from '../models/user-profile.model';
import { UserProfileRepository } from '../repositories/user-profile.repository';

export class UserProfileController {
  constructor(
    @repository(UserProfileRepository)
    public userProfileRepository: UserProfileRepository,
  ) {}

  @get('user/profile/{id}', {
    responses: {
      '200': {
        description: 'User profile',
        content: {
          'application/json': {
            schema: { type: 'object' },
          },
        },
      },
    },
  })
  async getProfile(
    @param.path.string('id') id: string,
  ): Promise<UserProfile> {
    const profile = await this.userProfileRepository.findById(id);
    if (!profile) {
      throw new HttpErrors.NotFound('Profile not found');
    }
    return profile;
  }

  @patch('update/profile/{id}', {
    responses: {
      '204': {
        description: 'Profile UPDATE success',
      },
    },
  })
  async updateProfile(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              bio: { type: 'string' },
              location: { type: 'string' },
              website: { type: 'string' },
              socialLinks: {
                type: 'object',
                properties: {
                  twitter: { type: 'string' },
                  linkedin: { type: 'string' },
                  github: { type: 'string' },
                },
              },
            },
          },
        },
      },
    })
    profile: Partial<UserProfile>,
  ): Promise<void> {
    const existingProfile = await this.userProfileRepository.findById(id);
    if (!existingProfile) {
      throw new HttpErrors.NotFound('Profile not found');
    }
    await this.userProfileRepository.updateById(id, profile);
  }
}
