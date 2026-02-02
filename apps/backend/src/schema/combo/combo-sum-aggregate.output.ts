import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ComboSumAggregate {

    @Field(() => Int, {nullable:true})
    combo_type?: number;

    @Field(() => Int, {nullable:true})
    original_price?: number;

    @Field(() => Int, {nullable:true})
    price?: number;
}
