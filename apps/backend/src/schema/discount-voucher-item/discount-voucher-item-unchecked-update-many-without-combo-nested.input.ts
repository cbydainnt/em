import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemCreateWithoutComboInput } from './discount-voucher-item-create-without-combo.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemCreateOrConnectWithoutComboInput } from './discount-voucher-item-create-or-connect-without-combo.input';
import { DiscountVoucherItemUpsertWithWhereUniqueWithoutComboInput } from './discount-voucher-item-upsert-with-where-unique-without-combo.input';
import { DiscountVoucherItemCreateManyComboInputEnvelope } from './discount-voucher-item-create-many-combo-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherItemWhereUniqueInput } from './discount-voucher-item-where-unique.input';
import { DiscountVoucherItemUpdateWithWhereUniqueWithoutComboInput } from './discount-voucher-item-update-with-where-unique-without-combo.input';
import { DiscountVoucherItemUpdateManyWithWhereWithoutComboInput } from './discount-voucher-item-update-many-with-where-without-combo.input';
import { DiscountVoucherItemScalarWhereInput } from './discount-voucher-item-scalar-where.input';

@InputType()
export class DiscountVoucherItemUncheckedUpdateManyWithoutComboNestedInput {

    @Field(() => [DiscountVoucherItemCreateWithoutComboInput], {nullable:true})
    @Type(() => DiscountVoucherItemCreateWithoutComboInput)
    create?: Array<DiscountVoucherItemCreateWithoutComboInput>;

    @Field(() => [DiscountVoucherItemCreateOrConnectWithoutComboInput], {nullable:true})
    @Type(() => DiscountVoucherItemCreateOrConnectWithoutComboInput)
    connectOrCreate?: Array<DiscountVoucherItemCreateOrConnectWithoutComboInput>;

    @Field(() => [DiscountVoucherItemUpsertWithWhereUniqueWithoutComboInput], {nullable:true})
    @Type(() => DiscountVoucherItemUpsertWithWhereUniqueWithoutComboInput)
    upsert?: Array<DiscountVoucherItemUpsertWithWhereUniqueWithoutComboInput>;

    @Field(() => DiscountVoucherItemCreateManyComboInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherItemCreateManyComboInputEnvelope)
    createMany?: DiscountVoucherItemCreateManyComboInputEnvelope;

    @Field(() => [DiscountVoucherItemWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>>;

    @Field(() => [DiscountVoucherItemWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>>;

    @Field(() => [DiscountVoucherItemWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>>;

    @Field(() => [DiscountVoucherItemWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>>;

    @Field(() => [DiscountVoucherItemUpdateWithWhereUniqueWithoutComboInput], {nullable:true})
    @Type(() => DiscountVoucherItemUpdateWithWhereUniqueWithoutComboInput)
    update?: Array<DiscountVoucherItemUpdateWithWhereUniqueWithoutComboInput>;

    @Field(() => [DiscountVoucherItemUpdateManyWithWhereWithoutComboInput], {nullable:true})
    @Type(() => DiscountVoucherItemUpdateManyWithWhereWithoutComboInput)
    updateMany?: Array<DiscountVoucherItemUpdateManyWithWhereWithoutComboInput>;

    @Field(() => [DiscountVoucherItemScalarWhereInput], {nullable:true})
    @Type(() => DiscountVoucherItemScalarWhereInput)
    deleteMany?: Array<DiscountVoucherItemScalarWhereInput>;
}
