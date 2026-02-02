import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FilterCategoryInput {
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  pageSize?: number;

  @Field(() => String, { nullable: true })
  orderBy?: string;
}
