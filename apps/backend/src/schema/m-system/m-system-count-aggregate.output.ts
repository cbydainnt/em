import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class MSystemCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    param_key!: number;

    @Field(() => Int, {nullable:false})
    param_no!: number;

    @Field(() => Int, {nullable:false})
    param_name!: number;

    @Field(() => Int, {nullable:false})
    param_value!: number;

    @Field(() => Int, {nullable:false})
    sort!: number;

    @Field(() => Int, {nullable:false})
    category!: number;

    @Field(() => Int, {nullable:false})
    created_by!: number;

    @Field(() => Int, {nullable:false})
    updated_by!: number;

    @Field(() => Int, {nullable:false})
    create_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    del_flg!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
