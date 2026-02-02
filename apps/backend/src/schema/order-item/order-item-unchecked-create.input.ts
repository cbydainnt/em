import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class OrderItemUncheckedCreateInput {

    @Field(() => String, {nullable:true})
    order_item_id?: string;

    @Field(() => String, {nullable:false})
    order_id!: string;

    @Field(() => Int, {nullable:true})
    item_type?: number;

    @Field(() => String, {nullable:true})
    combo_id?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => Int, {nullable:false})
    final_price!: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;
}
