import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUserCreateWithoutUserInput } from './discount-voucher-user-create-without-user.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserCreateOrConnectWithoutUserInput } from './discount-voucher-user-create-or-connect-without-user.input';
import { DiscountVoucherUserUpsertWithWhereUniqueWithoutUserInput } from './discount-voucher-user-upsert-with-where-unique-without-user.input';
import { DiscountVoucherUserCreateManyUserInputEnvelope } from './discount-voucher-user-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUserWhereUniqueInput } from './discount-voucher-user-where-unique.input';
import { DiscountVoucherUserUpdateWithWhereUniqueWithoutUserInput } from './discount-voucher-user-update-with-where-unique-without-user.input';
import { DiscountVoucherUserUpdateManyWithWhereWithoutUserInput } from './discount-voucher-user-update-many-with-where-without-user.input';
import { DiscountVoucherUserScalarWhereInput } from './discount-voucher-user-scalar-where.input';

@InputType()
export class DiscountVoucherUserUpdateManyWithoutUserNestedInput {

    @Field(() => [DiscountVoucherUserCreateWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUserCreateWithoutUserInput)
    create?: Array<DiscountVoucherUserCreateWithoutUserInput>;

    @Field(() => [DiscountVoucherUserCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUserCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<DiscountVoucherUserCreateOrConnectWithoutUserInput>;

    @Field(() => [DiscountVoucherUserUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUserUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<DiscountVoucherUserUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => DiscountVoucherUserCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherUserCreateManyUserInputEnvelope)
    createMany?: DiscountVoucherUserCreateManyUserInputEnvelope;

    @Field(() => [DiscountVoucherUserWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherUserWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DiscountVoucherUserWhereUniqueInput, 'id' | 'discount_voucher_id_user_id'>>;

    @Field(() => [DiscountVoucherUserWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherUserWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DiscountVoucherUserWhereUniqueInput, 'id' | 'discount_voucher_id_user_id'>>;

    @Field(() => [DiscountVoucherUserWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherUserWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DiscountVoucherUserWhereUniqueInput, 'id' | 'discount_voucher_id_user_id'>>;

    @Field(() => [DiscountVoucherUserWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherUserWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DiscountVoucherUserWhereUniqueInput, 'id' | 'discount_voucher_id_user_id'>>;

    @Field(() => [DiscountVoucherUserUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUserUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<DiscountVoucherUserUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [DiscountVoucherUserUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUserUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<DiscountVoucherUserUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [DiscountVoucherUserScalarWhereInput], {nullable:true})
    @Type(() => DiscountVoucherUserScalarWhereInput)
    deleteMany?: Array<DiscountVoucherUserScalarWhereInput>;
}
