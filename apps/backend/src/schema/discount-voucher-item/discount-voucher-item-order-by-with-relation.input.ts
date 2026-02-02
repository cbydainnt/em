import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { DiscountVoucherOrderByWithRelationInput } from '../discount-voucher/discount-voucher-order-by-with-relation.input';
import { CourseOrderByWithRelationInput } from '../course/course-order-by-with-relation.input';
import { ComboOrderByWithRelationInput } from '../combo/combo-order-by-with-relation.input';

@InputType()
export class DiscountVoucherItemOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    discount_voucher_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_id?: keyof typeof SortOrder;

    @Field(() => DiscountVoucherOrderByWithRelationInput, {nullable:true})
    voucher?: DiscountVoucherOrderByWithRelationInput;

    @Field(() => CourseOrderByWithRelationInput, {nullable:true})
    course?: CourseOrderByWithRelationInput;

    @Field(() => ComboOrderByWithRelationInput, {nullable:true})
    combo?: ComboOrderByWithRelationInput;
}
