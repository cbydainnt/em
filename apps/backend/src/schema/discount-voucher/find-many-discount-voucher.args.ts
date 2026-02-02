import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherOrderByWithRelationInput } from './discount-voucher-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherScalarFieldEnum } from './discount-voucher-scalar-field.enum';

@ArgsType()
export class FindManyDiscountVoucherArgs {

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    @Type(() => DiscountVoucherWhereInput)
    where?: DiscountVoucherWhereInput;

    @Field(() => [DiscountVoucherOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DiscountVoucherOrderByWithRelationInput>;

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [DiscountVoucherScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof DiscountVoucherScalarFieldEnum>;
}
