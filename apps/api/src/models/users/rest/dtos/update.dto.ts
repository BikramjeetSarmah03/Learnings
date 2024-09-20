import { PartialType } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { CreateUser } from './create.dto';

export class UpdateUser extends PartialType(CreateUser) {
  id: User['id'];
}
