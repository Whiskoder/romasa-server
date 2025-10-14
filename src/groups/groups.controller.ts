import { GroupsService } from 'src/groups/groups.service';

export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
}
