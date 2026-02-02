import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboWhereInput } from './combo-where.input';
import { Type } from 'class-transformer';
import { ComboUpdateWithoutDiscount_vouchersInput } from './combo-update-without-discount-vouchers.input';

@InputType()
export class ComboUpdateToOneWithWhereWithoutDiscount_vouchersInput {

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    where?: ComboWhereInput;

    @Field(() => ComboUpdateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => ComboUpdateWithoutDiscount_vouchersInput)
    data!: ComboUpdateWithoutDiscount_vouchersInput;
}
