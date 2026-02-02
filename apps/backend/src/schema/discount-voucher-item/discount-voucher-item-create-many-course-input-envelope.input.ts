import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemCreateManyCourseInput } from './discount-voucher-item-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class DiscountVoucherItemCreateManyCourseInputEnvelope {

    @Field(() => [DiscountVoucherItemCreateManyCourseInput], {nullable:false})
    @Type(() => DiscountVoucherItemCreateManyCourseInput)
    data!: Array<DiscountVoucherItemCreateManyCourseInput>;
}
