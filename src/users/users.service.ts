import { Injectable } from '@nestjs/common';

import { UserRepository } from './infraestructure/persistence/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
}
