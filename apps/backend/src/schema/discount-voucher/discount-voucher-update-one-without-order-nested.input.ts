import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherCreateWithoutOrderInput } from './discount-voucher-create-without-order.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateOrConnectWithoutOrderInput } from './discount-voucher-create-or-connect-without-order.input';
import { DiscountVoucherUpsertWithoutOrderInput } from './discount-voucher-upsert-without-order.input';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';
import { DiscountVoucherUpdateToOneWithWhereWithoutOrderInput } from './discount-voucher-update-to-one-with-where-without-order.input';

@InputType()
export class DiscountVoucherUpdateOneWithoutOrderNestedInput {

    @Field(() => DiscountVoucherCreateWithoutOrderInput, {nullable:true})
    @Type(() => DiscountVoucherCreateWithoutOrderInput)
    create?: DiscountVoucherCreateWithoutOrderInput;

    @Field(() => DiscountVoucherCreateOrConnectWithoutOrderInput, {nullable:true})
    @Type(() => DiscountVoucherCreateOrConnectWithoutOrderInput)
    connectOrCreate?: DiscountVoucherCreateOrConnectWithoutOrderInput;

    @Field(() => DiscountVoucherUpsertWithoutOrderInput, {nullable:true})
    @Type(() => DiscountVoucherUpsertWithoutOrderInput)
    upsert?: DiscountVoucherUpsertWithoutOrderInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    @Type(() => DiscountVoucherWhereInput)
    delete?: DiscountVoucherWhereInput;

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:true})
    @Type(() => DiscountVoucherWhereUniqueInput)
    connect?: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;

    @Field(() => DiscountVoucherUpdateToOneWithWhereWithoutOrderInput, {nullable:true})
    @Type(() => DiscountVoucherUpdateToOneWithWhereWithoutOrderInput)
    update?: DiscountVoucherUpdateToOneWithWhereWithoutOrderInput;
}
