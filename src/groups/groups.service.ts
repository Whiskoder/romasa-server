import { Injectable } from '@nestjs/common';

import { GroupRepository } from './infraestructure/persistence/group.repository';

@Injectable()
export class GroupsService {
  constructor(private readonly groupRepository: GroupRepository) {}
}
