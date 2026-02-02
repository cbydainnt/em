import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUserCreateWithoutVoucherInput } from './discount-voucher-user-create-without-voucher.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserCreateOrConnectWithoutVoucherInput } from './discount-voucher-user-create-or-connect-without-voucher.input';
import { DiscountVoucherUserCreateManyVoucherInputEnvelope } from './discount-voucher-user-create-many-voucher-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUserWhereUniqueInput } from './discount-voucher-user-where-unique.input';

@InputType()
export class DiscountVoucherUserCreateNestedManyWithoutVoucherInput {

    @Field(() => [DiscountVoucherUserCreateWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUserCreateWithoutVoucherInput)
    create?: Array<DiscountVoucherUserCreateWithoutVoucherInput>;

    @Field(() => [DiscountVoucherUserCreateOrConnectWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUserCreateOrConnectWithoutVoucherInput)
    connectOrCreate?: Array<DiscountVoucherUserCreateOrConnectWithoutVoucherInput>;

    @Field(() => DiscountVoucherUserCreateManyVoucherInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherUserCreateManyVoucherInputEnvelope)
    createMany?: DiscountVoucherUserCreateManyVoucherInputEnvelope;

    @Field(() => [DiscountVoucherUserWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherUserWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DiscountVoucherUserWhereUniqueInput, 'id' | 'discount_voucher_id_user_id'>>;
}
