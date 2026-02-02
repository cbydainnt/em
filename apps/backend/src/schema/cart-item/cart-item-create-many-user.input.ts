import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CartItemCreateManyUserInput {

    @Field(() => String, {nullable:true})
    cart_item_id?: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => Date, {nullable:true})
    added_at?: Date | string;

    @Field(() => Boolean, {nullable:true})
    selected?: boolean;
}
