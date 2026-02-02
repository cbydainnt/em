import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemDiscount_voucher_idCourse_idCompoundUniqueInput } from './discount-voucher-item-discount-voucher-id-course-id-compound-unique.input';
import { DiscountVoucherItemDiscount_voucher_idCombo_idCompoundUniqueInput } from './discount-voucher-item-discount-voucher-id-combo-id-compound-unique.input';
import { DiscountVoucherItemWhereInput } from './discount-voucher-item-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DiscountVoucherRelationFilter } from '../discount-voucher/discount-voucher-relation-filter.input';
import { CourseNullableRelationFilter } from '../course/course-nullable-relation-filter.input';
import { ComboNullableRelationFilter } from '../combo/combo-nullable-relation-filter.input';

@InputType()
export class DiscountVoucherItemWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => DiscountVoucherItemDiscount_voucher_idCourse_idCompoundUniqueInput, {nullable:true})
    discount_voucher_id_course_id?: DiscountVoucherItemDiscount_voucher_idCourse_idCompoundUniqueInput;

    @Field(() => DiscountVoucherItemDiscount_voucher_idCombo_idCompoundUniqueInput, {nullable:true})
    discount_voucher_id_combo_id?: DiscountVoucherItemDiscount_voucher_idCombo_idCompoundUniqueInput;

    @Field(() => [DiscountVoucherItemWhereInput], {nullable:true})
    AND?: Array<DiscountVoucherItemWhereInput>;

    @Field(() => [DiscountVoucherItemWhereInput], {nullable:true})
    OR?: Array<DiscountVoucherItemWhereInput>;

    @Field(() => [DiscountVoucherItemWhereInput], {nullable:true})
    NOT?: Array<DiscountVoucherItemWhereInput>;

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
