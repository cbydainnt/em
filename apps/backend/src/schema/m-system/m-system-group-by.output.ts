import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { MSystemCountAggregate } from './m-system-count-aggregate.output';
import { MSystemAvgAggregate } from './m-system-avg-aggregate.output';
import { MSystemSumAggregate } from './m-system-sum-aggregate.output';
import { MSystemMinAggregate } from './m-system-min-aggregate.output';
import { MSystemMaxAggregate } from './m-system-max-aggregate.output';

@ObjectType()
export class MSystemGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

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

    @Field(() => MSystemCountAggregate, {nullable:true})
    _count?: MSystemCountAggregate;

    @Field(() => MSystemAvgAggregate, {nullable:true})
    _avg?: MSystemAvgAggregate;

    @Field(() => MSystemSumAggregate, {nullable:true})
    _sum?: MSystemSumAggregate;

    @Field(() => MSystemMinAggregate, {nullable:true})
    _min?: MSystemMinAggregate;

    @Field(() => MSystemMaxAggregate, {nullable:true})
    _max?: MSystemMaxAggregate;
}
