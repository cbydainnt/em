import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemCreateWithoutComboInput } from './discount-voucher-item-create-without-combo.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemCreateOrConnectWithoutComboInput } from './discount-voucher-item-create-or-connect-without-combo.input';
import { DiscountVoucherItemCreateManyComboInputEnvelope } from './discount-voucher-item-create-many-combo-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherItemWhereUniqueInput } from './discount-voucher-item-where-unique.input';

@InputType()
export class DiscountVoucherItemUncheckedCreateNestedManyWithoutComboInput {

    @Field(() => [DiscountVoucherItemCreateWithoutComboInput], {nullable:true})
    @Type(() => DiscountVoucherItemCreateWithoutComboInput)
    create?: Array<DiscountVoucherItemCreateWithoutComboInput>;

    @Field(() => [DiscountVoucherItemCreateOrConnectWithoutComboInput], {nullable:true})
    @Type(() => DiscountVoucherItemCreateOrConnectWithoutComboInput)
    connectOrCreate?: Array<DiscountVoucherItemCreateOrConnectWithoutComboInput>;

    @Field(() => DiscountVoucherItemCreateManyComboInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherItemCreateManyComboInputEnvelope)
    createMany?: DiscountVoucherItemCreateManyComboInputEnvelope;

    @Field(() => [DiscountVoucherItemWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>>;
}
