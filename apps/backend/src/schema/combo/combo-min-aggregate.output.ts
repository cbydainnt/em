import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ComboMinAggregate {

    @Field(() => String, {nullable:true})
    combo_id?: string;

    @Field(() => String, {nullable:true})
    combo_name?: string;

    @Field(() => Int, {nullable:true})
    combo_type?: number;

    @Field(() => Int, {nullable:true})
    original_price?: number;

    @Field(() => Int, {nullable:true})
    price?: number;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;
}
