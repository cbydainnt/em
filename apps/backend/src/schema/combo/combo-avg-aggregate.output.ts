import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ComboAvgAggregate {

    @Field(() => Float, {nullable:true})
    combo_type?: number;

    @Field(() => Float, {nullable:true})
    original_price?: number;

    @Field(() => Float, {nullable:true})
    price?: number;
}
