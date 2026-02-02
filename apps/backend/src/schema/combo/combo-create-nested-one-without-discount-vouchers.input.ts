import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCreateWithoutDiscount_vouchersInput } from './combo-create-without-discount-vouchers.input';
import { Type } from 'class-transformer';
import { ComboCreateOrConnectWithoutDiscount_vouchersInput } from './combo-create-or-connect-without-discount-vouchers.input';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';

@InputType()
export class ComboCreateNestedOneWithoutDiscount_vouchersInput {

    @Field(() => ComboCreateWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => ComboCreateWithoutDiscount_vouchersInput)
    create?: ComboCreateWithoutDiscount_vouchersInput;

    @Field(() => ComboCreateOrConnectWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => ComboCreateOrConnectWithoutDiscount_vouchersInput)
    connectOrCreate?: ComboCreateOrConnectWithoutDiscount_vouchersInput;

    @Field(() => ComboWhereUniqueInput, {nullable:true})
    @Type(() => ComboWhereUniqueInput)
    connect?: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;
}
