import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ActiveCodeCountAggregate } from './active-code-count-aggregate.output';
import { ActiveCodeAvgAggregate } from './active-code-avg-aggregate.output';
import { ActiveCodeSumAggregate } from './active-code-sum-aggregate.output';
import { ActiveCodeMinAggregate } from './active-code-min-aggregate.output';
import { ActiveCodeMaxAggregate } from './active-code-max-aggregate.output';

@ObjectType()
export class ActiveCodeGroupBy {

    @Field(() => String, {nullable:false})
    active_code_id!: string;

    @Field(() => String, {nullable:false})
    order_item_id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => String, {nullable:false})
    customer_id!: string;

    @Field(() => String, {nullable:true})
    combo_id?: string;

    @Field(() => Int, {nullable:false})
    item_type!: number;

    @Field(() => String, {nullable:false})
    code!: string;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:true})
    used_at?: Date | string;

    @Field(() => Date, {nullable:true})
    expires_at?: Date | string;

    @Field(() => ActiveCodeCountAggregate, {nullable:true})
    _count?: ActiveCodeCountAggregate;

    @Field(() => ActiveCodeAvgAggregate, {nullable:true})
    _avg?: ActiveCodeAvgAggregate;

    @Field(() => ActiveCodeSumAggregate, {nullable:true})
    _sum?: ActiveCodeSumAggregate;

    @Field(() => ActiveCodeMinAggregate, {nullable:true})
    _min?: ActiveCodeMinAggregate;

    @Field(() => ActiveCodeMaxAggregate, {nullable:true})
    _max?: ActiveCodeMaxAggregate;
}
