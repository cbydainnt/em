import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboUpdateWithoutDiscount_vouchersInput } from './combo-update-without-discount-vouchers.input';
import { Type } from 'class-transformer';
import { ComboCreateWithoutDiscount_vouchersInput } from './combo-create-without-discount-vouchers.input';
import { ComboWhereInput } from './combo-where.input';

@InputType()
export class ComboUpsertWithoutDiscount_vouchersInput {

    @Field(() => ComboUpdateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => ComboUpdateWithoutDiscount_vouchersInput)
    update!: ComboUpdateWithoutDiscount_vouchersInput;

    @Field(() => ComboCreateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => ComboCreateWithoutDiscount_vouchersInput)
    create!: ComboCreateWithoutDiscount_vouchersInput;

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    where?: ComboWhereInput;
}
