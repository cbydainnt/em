import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemCreateWithoutVoucherInput } from './discount-voucher-item-create-without-voucher.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemCreateOrConnectWithoutVoucherInput } from './discount-voucher-item-create-or-connect-without-voucher.input';
import { DiscountVoucherItemUpsertWithWhereUniqueWithoutVoucherInput } from './discount-voucher-item-upsert-with-where-unique-without-voucher.input';
import { DiscountVoucherItemCreateManyVoucherInputEnvelope } from './discount-voucher-item-create-many-voucher-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherItemWhereUniqueInput } from './discount-voucher-item-where-unique.input';
import { DiscountVoucherItemUpdateWithWhereUniqueWithoutVoucherInput } from './discount-voucher-item-update-with-where-unique-without-voucher.input';
import { DiscountVoucherItemUpdateManyWithWhereWithoutVoucherInput } from './discount-voucher-item-update-many-with-where-without-voucher.input';
import { DiscountVoucherItemScalarWhereInput } from './discount-voucher-item-scalar-where.input';

@InputType()
export class DiscountVoucherItemUpdateManyWithoutVoucherNestedInput {

    @Field(() => [DiscountVoucherItemCreateWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherItemCreateWithoutVoucherInput)
    create?: Array<DiscountVoucherItemCreateWithoutVoucherInput>;

    @Field(() => [DiscountVoucherItemCreateOrConnectWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherItemCreateOrConnectWithoutVoucherInput)
    connectOrCreate?: Array<DiscountVoucherItemCreateOrConnectWithoutVoucherInput>;

    @Field(() => [DiscountVoucherItemUpsertWithWhereUniqueWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherItemUpsertWithWhereUniqueWithoutVoucherInput)
    upsert?: Array<DiscountVoucherItemUpsertWithWhereUniqueWithoutVoucherInput>;

    @Field(() => DiscountVoucherItemCreateManyVoucherInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherItemCreateManyVoucherInputEnvelope)
    createMany?: DiscountVoucherItemCreateManyVoucherInputEnvelope;

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

    @Field(() => [DiscountVoucherItemUpdateWithWhereUniqueWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherItemUpdateWithWhereUniqueWithoutVoucherInput)
    update?: Array<DiscountVoucherItemUpdateWithWhereUniqueWithoutVoucherInput>;

    @Field(() => [DiscountVoucherItemUpdateManyWithWhereWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherItemUpdateManyWithWhereWithoutVoucherInput)
    updateMany?: Array<DiscountVoucherItemUpdateManyWithWhereWithoutVoucherInput>;

    @Field(() => [DiscountVoucherItemScalarWhereInput], {nullable:true})
    @Type(() => DiscountVoucherItemScalarWhereInput)
    deleteMany?: Array<DiscountVoucherItemScalarWhereInput>;
}
