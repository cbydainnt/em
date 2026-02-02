import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CartItemUser_idCourse_idCompoundUniqueInput } from './cart-item-user-id-course-id-compound-unique.input';
import { CartItemWhereInput } from './cart-item-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { CourseRelationFilter } from '../course/course-relation-filter.input';

@InputType()
export class CartItemWhereUniqueInput {

    @Field(() => String, {nullable:true})
    cart_item_id?: string;

    @Field(() => CartItemUser_idCourse_idCompoundUniqueInput, {nullable:true})
    user_id_course_id?: CartItemUser_idCourse_idCompoundUniqueInput;

    @Field(() => [CartItemWhereInput], {nullable:true})
    AND?: Array<CartItemWhereInput>;

    @Field(() => [CartItemWhereInput], {nullable:true})
    OR?: Array<CartItemWhereInput>;

    @Field(() => [CartItemWhereInput], {nullable:true})
    NOT?: Array<CartItemWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    course_id?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    added_at?: DateTimeFilter;

    @Field(() => BoolFilter, {nullable:true})
    selected?: BoolFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    user?: UserRelationFilter;

    @Field(() => CourseRelationFilter, {nullable:true})
    course?: CourseRelationFilter;
}
