import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class MSystemMaxAggregate {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    param_key?: string;

    @Field(() => String, {nullable:true})
    param_no?: string;

    @Field(() => String, {nullable:true})
    param_name?: string;

    @Field(() => String, {nullable:true})
    param_value?: string;

    @Field(() => Int, {nullable:true})
    sort?: number;

    @Field(() => String, {nullable:true})
    category?: string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Date, {nullable:true})
    create_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => Int, {nullable:true})
    del_flg?: number;
}
