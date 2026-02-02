import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemCreateWithoutVoucherInput } from './discount-voucher-item-create-without-voucher.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemCreateOrConnectWithoutVoucherInput } from './discount-voucher-item-create-or-connect-without-voucher.input';
import { DiscountVoucherItemCreateManyVoucherInputEnvelope } from './discount-voucher-item-create-many-voucher-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherItemWhereUniqueInput } from './discount-voucher-item-where-unique.input';

@InputType()
export class DiscountVoucherItemUncheckedCreateNestedManyWithoutVoucherInput {

    @Field(() => [DiscountVoucherItemCreateWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherItemCreateWithoutVoucherInput)
    create?: Array<DiscountVoucherItemCreateWithoutVoucherInput>;

    @Field(() => [DiscountVoucherItemCreateOrConnectWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherItemCreateOrConnectWithoutVoucherInput)
    connectOrCreate?: Array<DiscountVoucherItemCreateOrConnectWithoutVoucherInput>;

    @Field(() => DiscountVoucherItemCreateManyVoucherInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherItemCreateManyVoucherInputEnvelope)
    createMany?: DiscountVoucherItemCreateManyVoucherInputEnvelope;

    @Field(() => [DiscountVoucherItemWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>>;
}
