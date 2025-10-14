import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { GroupRepository } from '../../group.repository';
import { GroupEntity } from 'src/groups/infraestructure/persistence/relational/entities';

@Injectable()
export class GroupRelationalRepository implements GroupRepository {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}
}
