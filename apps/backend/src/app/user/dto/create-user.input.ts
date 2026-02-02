import { UserType } from '@/enums/user';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: '', nullable: true })
  type: UserType;

  @Field({ description: 'email' })
  email: string;

  @Field({ description: 'avatar', nullable: true })
  avatar?: string;

  @Field({ description: 'password', nullable: true })
  password?: string;

  @Field({ description: 'name', nullable: true })
  name: string;

  @Field({ description: 'phone', nullable: true })
  phone?: string;

  @Field({ description: 'address', nullable: true })
  address?: string;
}
