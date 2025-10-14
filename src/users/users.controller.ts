import { UsersService } from 'src/users/users.service';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
