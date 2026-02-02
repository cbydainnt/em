import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ComboCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    combo_id?: true;

    @Field(() => Boolean, {nullable:true})
    combo_name?: true;

    @Field(() => Boolean, {nullable:true})
    combo_type?: true;

    @Field(() => Boolean, {nullable:true})
    original_price?: true;

    @Field(() => Boolean, {nullable:true})
    price?: true;

    @Field(() => Boolean, {nullable:true})
    del_flg?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    created_by?: true;

    @Field(() => Boolean, {nullable:true})
    updated_by?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
