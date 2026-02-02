import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class MSystemCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    param_key?: true;

    @Field(() => Boolean, {nullable:true})
    param_no?: true;

    @Field(() => Boolean, {nullable:true})
    param_name?: true;

    @Field(() => Boolean, {nullable:true})
    param_value?: true;

    @Field(() => Boolean, {nullable:true})
    sort?: true;

    @Field(() => Boolean, {nullable:true})
    category?: true;

    @Field(() => Boolean, {nullable:true})
    created_by?: true;

    @Field(() => Boolean, {nullable:true})
    updated_by?: true;

    @Field(() => Boolean, {nullable:true})
    create_at?: true;

    @Field(() => Boolean, {nullable:true})
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    del_flg?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
