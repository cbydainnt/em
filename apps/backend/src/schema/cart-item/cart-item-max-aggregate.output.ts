import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CartItemMaxAggregate {

    @Field(() => String, {nullable:true})
    cart_item_id?: string;

    @Field(() => String, {nullable:true})
    user_id?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => Date, {nullable:true})
    added_at?: Date | string;

    @Field(() => Boolean, {nullable:true})
    selected?: boolean;
}
