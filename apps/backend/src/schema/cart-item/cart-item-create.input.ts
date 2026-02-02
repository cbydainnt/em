import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutCartItemsInput } from '../user/user-create-nested-one-without-cart-items.input';
import { CourseCreateNestedOneWithoutCart_itemsInput } from '../course/course-create-nested-one-without-cart-items.input';

@InputType()
export class CartItemCreateInput {

    @Field(() => String, {nullable:true})
    cart_item_id?: string;

    @Field(() => Date, {nullable:true})
    added_at?: Date | string;

    @Field(() => Boolean, {nullable:true})
    selected?: boolean;

    @Field(() => UserCreateNestedOneWithoutCartItemsInput, {nullable:false})
    user!: UserCreateNestedOneWithoutCartItemsInput;

    @Field(() => CourseCreateNestedOneWithoutCart_itemsInput, {nullable:false})
    course!: CourseCreateNestedOneWithoutCart_itemsInput;
}
