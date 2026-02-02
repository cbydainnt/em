import { UserType } from '@/enums/user';
import { UserOrderByWithRelationInput } from '@/schema/user/user-order-by-with-relation.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class FilterUserInput {
  @Field(() => String, { description: '', nullable: true })
  search?: string = undefined;

  @Field({ description: '', nullable: true })
  type: UserType;

  @Field(() => Int, { description: '' })
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  pageSize?: number = 25;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  orderBy?: UserOrderByWithRelationInput = undefined;
}
