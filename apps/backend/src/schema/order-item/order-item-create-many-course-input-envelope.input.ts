import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderItemCreateManyCourseInput } from './order-item-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class OrderItemCreateManyCourseInputEnvelope {

    @Field(() => [OrderItemCreateManyCourseInput], {nullable:false})
    @Type(() => OrderItemCreateManyCourseInput)
    data!: Array<OrderItemCreateManyCourseInput>;
}
