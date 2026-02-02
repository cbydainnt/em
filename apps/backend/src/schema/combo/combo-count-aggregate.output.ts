import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ComboCountAggregate {

    @Field(() => Int, {nullable:false})
    combo_id!: number;

    @Field(() => Int, {nullable:false})
    combo_name!: number;

    @Field(() => Int, {nullable:false})
    combo_type!: number;

    @Field(() => Int, {nullable:false})
    original_price!: number;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => Int, {nullable:false})
    del_flg!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    created_by!: number;

    @Field(() => Int, {nullable:false})
    updated_by!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
