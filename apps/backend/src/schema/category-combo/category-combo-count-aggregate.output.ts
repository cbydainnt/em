import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CategoryComboCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    category_id!: number;

    @Field(() => Int, {nullable:false})
    combo_id!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
