import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherCreateWithoutUsed_byInput } from './discount-voucher-create-without-used-by.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateOrConnectWithoutUsed_byInput } from './discount-voucher-create-or-connect-without-used-by.input';
import { DiscountVoucherUpsertWithoutUsed_byInput } from './discount-voucher-upsert-without-used-by.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';
import { DiscountVoucherUpdateToOneWithWhereWithoutUsed_byInput } from './discount-voucher-update-to-one-with-where-without-used-by.input';

@InputType()
export class DiscountVoucherUpdateOneRequiredWithoutUsed_byNestedInput {

    @Field(() => DiscountVoucherCreateWithoutUsed_byInput, {nullable:true})
    @Type(() => DiscountVoucherCreateWithoutUsed_byInput)
    create?: DiscountVoucherCreateWithoutUsed_byInput;

    @Field(() => DiscountVoucherCreateOrConnectWithoutUsed_byInput, {nullable:true})
    @Type(() => DiscountVoucherCreateOrConnectWithoutUsed_byInput)
    connectOrCreate?: DiscountVoucherCreateOrConnectWithoutUsed_byInput;

    @Field(() => DiscountVoucherUpsertWithoutUsed_byInput, {nullable:true})
    @Type(() => DiscountVoucherUpsertWithoutUsed_byInput)
    upsert?: DiscountVoucherUpsertWithoutUsed_byInput;

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:true})
    @Type(() => DiscountVoucherWhereUniqueInput)
    connect?: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;

    @Field(() => DiscountVoucherUpdateToOneWithWhereWithoutUsed_byInput, {nullable:true})
    @Type(() => DiscountVoucherUpdateToOneWithWhereWithoutUsed_byInput)
    update?: DiscountVoucherUpdateToOneWithWhereWithoutUsed_byInput;
}
