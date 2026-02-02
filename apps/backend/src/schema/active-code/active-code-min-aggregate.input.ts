import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ActiveCodeMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    active_code_id?: true;

    @Field(() => Boolean, {nullable:true})
    order_item_id?: true;

    @Field(() => Boolean, {nullable:true})
    course_id?: true;

    @Field(() => Boolean, {nullable:true})
    customer_id?: true;

    @Field(() => Boolean, {nullable:true})
    combo_id?: true;

    @Field(() => Boolean, {nullable:true})
    item_type?: true;

    @Field(() => Boolean, {nullable:true})
    code?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    used_at?: true;

    @Field(() => Boolean, {nullable:true})
    expires_at?: true;
}
