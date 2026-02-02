import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';
import { Type } from 'class-transformer';
import { ComboCreateWithoutDiscount_vouchersInput } from './combo-create-without-discount-vouchers.input';

@InputType()
export class ComboCreateOrConnectWithoutDiscount_vouchersInput {

    @Field(() => ComboWhereUniqueInput, {nullable:false})
    @Type(() => ComboWhereUniqueInput)
    where!: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;

    @Field(() => ComboCreateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => ComboCreateWithoutDiscount_vouchersInput)
    create!: ComboCreateWithoutDiscount_vouchersInput;
}
