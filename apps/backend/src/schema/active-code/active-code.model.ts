import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ActiveCode {

    @Field(() => ID, {nullable:false})
    active_code_id!: string;

    @Field(() => String, {nullable:false})
    order_item_id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => String, {nullable:false})
    customer_id!: string;

    @Field(() => String, {nullable:true})
    combo_id!: string | null;

    @Field(() => Int, {nullable:false,defaultValue:2})
    item_type!: number;

    @Field(() => String, {nullable:false})
    code!: string;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:true})
    used_at!: Date | null;

    @Field(() => Date, {nullable:true})
    expires_at!: Date | null;
}
