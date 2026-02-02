import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class MSystemCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    param_key!: string;

    @Field(() => String, {nullable:false})
    param_no!: string;

    @Field(() => String, {nullable:false})
    param_name!: string;

    @Field(() => String, {nullable:false})
    param_value!: string;

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
