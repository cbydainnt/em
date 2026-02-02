import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class MSystem {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    param_key!: string;

    @Field(() => String, {nullable:false})
    param_no!: string;

    @Field(() => String, {nullable:false})
    param_name!: string;

    @Field(() => String, {nullable:false})
    param_value!: string;

    @Field(() => Int, {nullable:true,defaultValue:0})
    sort!: number | null;

    @Field(() => String, {nullable:true})
    category!: string | null;

    @Field(() => String, {nullable:true})
    created_by!: string | null;

    @Field(() => String, {nullable:true})
    updated_by!: string | null;

    @Field(() => Date, {nullable:true})
    create_at!: Date | null;

    @Field(() => Date, {nullable:true})
    updated_at!: Date | null;

    @Field(() => Int, {nullable:true,defaultValue:0})
    del_flg!: number | null;
}
