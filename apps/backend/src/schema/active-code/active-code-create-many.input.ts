import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class ActiveCodeCreateManyInput {

    @Field(() => String, {nullable:true})
    active_code_id?: string;

    @Field(() => String, {nullable:false})
    order_item_id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => String, {nullable:false})
    customer_id!: string;

    @Field(() => String, {nullable:true})
    combo_id?: string;

    @Field(() => Int, {nullable:true})
    item_type?: number;

    @Field(() => String, {nullable:false})
    code!: string;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    used_at?: Date | string;

    @Field(() => Date, {nullable:true})
    expires_at?: Date | string;
}
