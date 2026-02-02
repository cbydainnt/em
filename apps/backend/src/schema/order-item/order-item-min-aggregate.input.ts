import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class OrderItemMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    order_item_id?: true;

    @Field(() => Boolean, {nullable:true})
    order_id?: true;

    @Field(() => Boolean, {nullable:true})
    item_type?: true;

    @Field(() => Boolean, {nullable:true})
    combo_id?: true;

    @Field(() => Boolean, {nullable:true})
    course_id?: true;

    @Field(() => Boolean, {nullable:true})
    final_price?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    del_flg?: true;
}
