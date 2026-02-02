import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';

@InputType()
export class DiscountVoucherItemScalarWhereInput {

    @Field(() => [DiscountVoucherItemScalarWhereInput], {nullable:true})
    AND?: Array<DiscountVoucherItemScalarWhereInput>;

    @Field(() => [DiscountVoucherItemScalarWhereInput], {nullable:true})
    OR?: Array<DiscountVoucherItemScalarWhereInput>;

    @Field(() => [DiscountVoucherItemScalarWhereInput], {nullable:true})
    NOT?: Array<DiscountVoucherItemScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    discount_voucher_id?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    course_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    combo_id?: StringNullableFilter;
}
