import { Controller } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
