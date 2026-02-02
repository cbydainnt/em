import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class MSystemAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    sort?: true;

    @Field(() => Boolean, {nullable:true})
    del_flg?: true;
}
