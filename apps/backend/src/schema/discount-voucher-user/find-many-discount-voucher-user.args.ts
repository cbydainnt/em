import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUserWhereInput } from './discount-voucher-user-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserOrderByWithRelationInput } from './discount-voucher-user-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUserWhereUniqueInput } from './discount-voucher-user-where-unique.input';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherUserScalarFieldEnum } from './discount-voucher-user-scalar-field.enum';

@ArgsType()
export class FindManyDiscountVoucherUserArgs {

    @Field(() => DiscountVoucherUserWhereInput, {nullable:true})
    @Type(() => DiscountVoucherUserWhereInput)
    where?: DiscountVoucherUserWhereInput;

    @Field(() => [DiscountVoucherUserOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DiscountVoucherUserOrderByWithRelationInput>;

    @Field(() => DiscountVoucherUserWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DiscountVoucherUserWhereUniqueInput, 'id' | 'discount_voucher_id_user_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [DiscountVoucherUserScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof DiscountVoucherUserScalarFieldEnum>;
}
