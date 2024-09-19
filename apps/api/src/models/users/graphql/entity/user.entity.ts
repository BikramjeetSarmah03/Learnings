import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { $Enums, User as UserType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class User implements RestrictProperties<User, UserType> {
  id: string;

  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

registerEnumType($Enums.AuthProviderType, {
  name: 'AuthProviderType',
});
