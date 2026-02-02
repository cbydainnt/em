import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCreateWithoutDiscount_vouchersInput } from './combo-create-without-discount-vouchers.input';
import { Type } from 'class-transformer';
import { ComboCreateOrConnectWithoutDiscount_vouchersInput } from './combo-create-or-connect-without-discount-vouchers.input';
import { ComboUpsertWithoutDiscount_vouchersInput } from './combo-upsert-without-discount-vouchers.input';
import { ComboWhereInput } from './combo-where.input';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';
import { ComboUpdateToOneWithWhereWithoutDiscount_vouchersInput } from './combo-update-to-one-with-where-without-discount-vouchers.input';

@InputType()
export class ComboUpdateOneWithoutDiscount_vouchersNestedInput {

    @Field(() => ComboCreateWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => ComboCreateWithoutDiscount_vouchersInput)
    create?: ComboCreateWithoutDiscount_vouchersInput;

    @Field(() => ComboCreateOrConnectWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => ComboCreateOrConnectWithoutDiscount_vouchersInput)
    connectOrCreate?: ComboCreateOrConnectWithoutDiscount_vouchersInput;

    @Field(() => ComboUpsertWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => ComboUpsertWithoutDiscount_vouchersInput)
    upsert?: ComboUpsertWithoutDiscount_vouchersInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    delete?: ComboWhereInput;

    @Field(() => ComboWhereUniqueInput, {nullable:true})
    @Type(() => ComboWhereUniqueInput)
    connect?: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;

    @Field(() => ComboUpdateToOneWithWhereWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => ComboUpdateToOneWithWhereWithoutDiscount_vouchersInput)
    update?: ComboUpdateToOneWithWhereWithoutDiscount_vouchersInput;
}
