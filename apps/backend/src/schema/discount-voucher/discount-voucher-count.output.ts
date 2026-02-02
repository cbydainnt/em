import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class DiscountVoucherCount {

    @Field(() => Int, {nullable:false})
    applicable_items?: number;

    @Field(() => Int, {nullable:false})
    applicable_users?: number;

    @Field(() => Int, {nullable:false})
    used_by?: number;

    @Field(() => Int, {nullable:false})
    order?: number;
}
