import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { DiscountVoucher } from '../discount-voucher/discount-voucher.model';
import { Course } from '../course/course.model';
import { Combo } from '../combo/combo.model';

@ObjectType()
export class DiscountVoucherItem {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    discount_voucher_id!: string;

    @Field(() => String, {nullable:true})
    course_id!: string | null;

    @Field(() => String, {nullable:true})
    combo_id!: string | null;

    @Field(() => DiscountVoucher, {nullable:false})
    voucher?: DiscountVoucher;

    @Field(() => Course, {nullable:true})
    course?: Course | null;

    @Field(() => Combo, {nullable:true})
    combo?: Combo | null;
}
