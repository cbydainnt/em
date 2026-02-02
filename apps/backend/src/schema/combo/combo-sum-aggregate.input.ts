import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ComboSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    combo_type?: true;

    @Field(() => Boolean, {nullable:true})
    original_price?: true;

    @Field(() => Boolean, {nullable:true})
    price?: true;
}
