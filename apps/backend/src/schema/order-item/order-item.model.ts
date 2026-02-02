import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Order } from '../order/order.model';
import { Combo } from '../combo/combo.model';
import { Course } from '../course/course.model';

@ObjectType()
export class OrderItem {

    @Field(() => ID, {nullable:false})
    order_item_id!: string;

    @Field(() => String, {nullable:false})
    order_id!: string;

    @Field(() => Int, {nullable:false,defaultValue:1})
    item_type!: number;

    @Field(() => String, {nullable:true})
    combo_id!: string | null;

    @Field(() => String, {nullable:true})
    course_id!: string | null;

    @Field(() => Int, {nullable:false})
    final_price!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:true})
    updated_at!: Date | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => Order, {nullable:false})
    order?: Order;

    @Field(() => Combo, {nullable:true})
    combo?: Combo | null;

    @Field(() => Course, {nullable:true})
    course?: Course | null;
}
