import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateNestedOneWithoutCart_itemsInput } from '../course/course-create-nested-one-without-cart-items.input';

@InputType()
export class CartItemCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    cart_item_id?: string;

    @Field(() => Date, {nullable:true})
    added_at?: Date | string;

    @Field(() => Boolean, {nullable:true})
    selected?: boolean;

    @Field(() => CourseCreateNestedOneWithoutCart_itemsInput, {nullable:false})
    course!: CourseCreateNestedOneWithoutCart_itemsInput;
}
