import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ActiveCodeCountAggregate {

    @Field(() => Int, {nullable:false})
    active_code_id!: number;

    @Field(() => Int, {nullable:false})
    order_item_id!: number;

    @Field(() => Int, {nullable:false})
    course_id!: number;

    @Field(() => Int, {nullable:false})
    customer_id!: number;

    @Field(() => Int, {nullable:false})
    combo_id!: number;

    @Field(() => Int, {nullable:false})
    item_type!: number;

    @Field(() => Int, {nullable:false})
    code!: number;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    used_at!: number;

    @Field(() => Int, {nullable:false})
    expires_at!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
