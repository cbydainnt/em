import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CartItemCreateManyCourseInput } from './cart-item-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class CartItemCreateManyCourseInputEnvelope {

    @Field(() => [CartItemCreateManyCourseInput], {nullable:false})
    @Type(() => CartItemCreateManyCourseInput)
    data!: Array<CartItemCreateManyCourseInput>;
}
