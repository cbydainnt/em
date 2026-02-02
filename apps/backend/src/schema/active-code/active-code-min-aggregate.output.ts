import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ActiveCodeMinAggregate {

    @Field(() => String, {nullable:true})
    active_code_id?: string;

    @Field(() => String, {nullable:true})
    order_item_id?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:true})
    customer_id?: string;

    @Field(() => String, {nullable:true})
    combo_id?: string;

    @Field(() => Int, {nullable:true})
    item_type?: number;

    @Field(() => String, {nullable:true})
    code?: string;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    used_at?: Date | string;

    @Field(() => Date, {nullable:true})
    expires_at?: Date | string;
}
