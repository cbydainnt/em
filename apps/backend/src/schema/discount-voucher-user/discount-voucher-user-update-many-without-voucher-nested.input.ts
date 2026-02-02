import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUserCreateWithoutVoucherInput } from './discount-voucher-user-create-without-voucher.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserCreateOrConnectWithoutVoucherInput } from './discount-voucher-user-create-or-connect-without-voucher.input';
import { DiscountVoucherUserUpsertWithWhereUniqueWithoutVoucherInput } from './discount-voucher-user-upsert-with-where-unique-without-voucher.input';
import { DiscountVoucherUserCreateManyVoucherInputEnvelope } from './discount-voucher-user-create-many-voucher-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUserWhereUniqueInput } from './discount-voucher-user-where-unique.input';
import { DiscountVoucherUserUpdateWithWhereUniqueWithoutVoucherInput } from './discount-voucher-user-update-with-where-unique-without-voucher.input';
import { DiscountVoucherUserUpdateManyWithWhereWithoutVoucherInput } from './discount-voucher-user-update-many-with-where-without-voucher.input';
import { DiscountVoucherUserScalarWhereInput } from './discount-voucher-user-scalar-where.input';

@InputType()
export class DiscountVoucherUserUpdateManyWithoutVoucherNestedInput {

    @Field(() => [DiscountVoucherUserCreateWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUserCreateWithoutVoucherInput)
    create?: Array<DiscountVoucherUserCreateWithoutVoucherInput>;

    @Field(() => [DiscountVoucherUserCreateOrConnectWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUserCreateOrConnectWithoutVoucherInput)
    connectOrCreate?: Array<DiscountVoucherUserCreateOrConnectWithoutVoucherInput>;

    @Field(() => [DiscountVoucherUserUpsertWithWhereUniqueWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUserUpsertWithWhereUniqueWithoutVoucherInput)
    upsert?: Array<DiscountVoucherUserUpsertWithWhereUniqueWithoutVoucherInput>;

    @Field(() => DiscountVoucherUserCreateManyVoucherInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherUserCreateManyVoucherInputEnvelope)
    createMany?: DiscountVoucherUserCreateManyVoucherInputEnvelope;

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

    @Field(() => [DiscountVoucherUserUpdateWithWhereUniqueWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUserUpdateWithWhereUniqueWithoutVoucherInput)
    update?: Array<DiscountVoucherUserUpdateWithWhereUniqueWithoutVoucherInput>;

    @Field(() => [DiscountVoucherUserUpdateManyWithWhereWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUserUpdateManyWithWhereWithoutVoucherInput)
    updateMany?: Array<DiscountVoucherUserUpdateManyWithWhereWithoutVoucherInput>;

    @Field(() => [DiscountVoucherUserScalarWhereInput], {nullable:true})
    @Type(() => DiscountVoucherUserScalarWhereInput)
    deleteMany?: Array<DiscountVoucherUserScalarWhereInput>;
}
