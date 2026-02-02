import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class ComboCreateManyInput {

    @Field(() => String, {nullable:true})
    combo_id?: string;

    @Field(() => String, {nullable:false})
    combo_name!: string;

    @Field(() => Int, {nullable:true})
    combo_type?: number;

    @Field(() => Int, {nullable:false})
    original_price!: number;

    @Field(() => Int, {nullable:false})
    price!: number;

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
