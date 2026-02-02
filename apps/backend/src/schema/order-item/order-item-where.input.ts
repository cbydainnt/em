import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { OrderRelationFilter } from '../order/order-relation-filter.input';
import { ComboNullableRelationFilter } from '../combo/combo-nullable-relation-filter.input';
import { CourseNullableRelationFilter } from '../course/course-nullable-relation-filter.input';

@InputType()
export class OrderItemWhereInput {

    @Field(() => [OrderItemWhereInput], {nullable:true})
    AND?: Array<OrderItemWhereInput>;

    @Field(() => [OrderItemWhereInput], {nullable:true})
    OR?: Array<OrderItemWhereInput>;

    @Field(() => [OrderItemWhereInput], {nullable:true})
    NOT?: Array<OrderItemWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    order_item_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    order_id?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    item_type?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    combo_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    course_id?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    final_price?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    updated_at?: DateTimeNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    del_flg?: BoolFilter;

    @Field(() => OrderRelationFilter, {nullable:true})
    order?: OrderRelationFilter;

    @Field(() => ComboNullableRelationFilter, {nullable:true})
    combo?: ComboNullableRelationFilter;

    @Field(() => CourseNullableRelationFilter, {nullable:true})
    course?: CourseNullableRelationFilter;
}
