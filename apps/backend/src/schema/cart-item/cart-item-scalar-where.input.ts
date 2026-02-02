import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';

@InputType()
export class CartItemScalarWhereInput {

    @Field(() => [CartItemScalarWhereInput], {nullable:true})
    AND?: Array<CartItemScalarWhereInput>;

    @Field(() => [CartItemScalarWhereInput], {nullable:true})
    OR?: Array<CartItemScalarWhereInput>;

    @Field(() => [CartItemScalarWhereInput], {nullable:true})
    NOT?: Array<CartItemScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    cart_item_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    course_id?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    added_at?: DateTimeFilter;

    @Field(() => BoolFilter, {nullable:true})
    selected?: BoolFilter;
}
