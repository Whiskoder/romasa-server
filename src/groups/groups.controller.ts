import { Controller } from '@nestjs/common';
import { GroupsService } from 'src/groups/groups.service';

@Controller({
  version: '1',
  path: 'groups',
})
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
}
