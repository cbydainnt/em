import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CartItemMaxAggregateInput {

    @Field(() => Boolean, {nullable:true})
    cart_item_id?: true;

    @Field(() => Boolean, {nullable:true})
    user_id?: true;

    @Field(() => Boolean, {nullable:true})
    course_id?: true;

    @Field(() => Boolean, {nullable:true})
    added_at?: true;

    @Field(() => Boolean, {nullable:true})
    selected?: true;
}
