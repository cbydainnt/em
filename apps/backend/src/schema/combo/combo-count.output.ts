import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ComboCount {

    @Field(() => Int, {nullable:false})
    categories?: number;

    @Field(() => Int, {nullable:false})
    courses?: number;

    @Field(() => Int, {nullable:false})
    order_items?: number;

    @Field(() => Int, {nullable:false})
    discount_vouchers?: number;
}
