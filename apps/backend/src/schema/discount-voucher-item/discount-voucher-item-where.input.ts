import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DiscountVoucherRelationFilter } from '../discount-voucher/discount-voucher-relation-filter.input';
import { CourseNullableRelationFilter } from '../course/course-nullable-relation-filter.input';
import { ComboNullableRelationFilter } from '../combo/combo-nullable-relation-filter.input';

@InputType()
export class DiscountVoucherItemWhereInput {

    @Field(() => [DiscountVoucherItemWhereInput], {nullable:true})
    AND?: Array<DiscountVoucherItemWhereInput>;

    @Field(() => [DiscountVoucherItemWhereInput], {nullable:true})
    OR?: Array<DiscountVoucherItemWhereInput>;

    @Field(() => [DiscountVoucherItemWhereInput], {nullable:true})
    NOT?: Array<DiscountVoucherItemWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    discount_voucher_id?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    course_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    combo_id?: StringNullableFilter;

    @Field(() => DiscountVoucherRelationFilter, {nullable:true})
    voucher?: DiscountVoucherRelationFilter;

    @Field(() => CourseNullableRelationFilter, {nullable:true})
    course?: CourseNullableRelationFilter;

    @Field(() => ComboNullableRelationFilter, {nullable:true})
    combo?: ComboNullableRelationFilter;
}
