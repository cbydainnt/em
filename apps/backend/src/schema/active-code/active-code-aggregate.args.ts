import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ActiveCodeWhereInput } from './active-code-where.input';
import { Type } from 'class-transformer';
import { ActiveCodeOrderByWithRelationInput } from './active-code-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ActiveCodeWhereUniqueInput } from './active-code-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ActiveCodeCountAggregateInput } from './active-code-count-aggregate.input';
import { ActiveCodeAvgAggregateInput } from './active-code-avg-aggregate.input';
import { ActiveCodeSumAggregateInput } from './active-code-sum-aggregate.input';
import { ActiveCodeMinAggregateInput } from './active-code-min-aggregate.input';
import { ActiveCodeMaxAggregateInput } from './active-code-max-aggregate.input';

@ArgsType()
export class ActiveCodeAggregateArgs {

    @Field(() => ActiveCodeWhereInput, {nullable:true})
    @Type(() => ActiveCodeWhereInput)
    where?: ActiveCodeWhereInput;

    @Field(() => [ActiveCodeOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ActiveCodeOrderByWithRelationInput>;

    @Field(() => ActiveCodeWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ActiveCodeWhereUniqueInput, 'active_code_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ActiveCodeCountAggregateInput, {nullable:true})
    _count?: ActiveCodeCountAggregateInput;

    @Field(() => ActiveCodeAvgAggregateInput, {nullable:true})
    _avg?: ActiveCodeAvgAggregateInput;

    @Field(() => ActiveCodeSumAggregateInput, {nullable:true})
    _sum?: ActiveCodeSumAggregateInput;

    @Field(() => ActiveCodeMinAggregateInput, {nullable:true})
    _min?: ActiveCodeMinAggregateInput;

    @Field(() => ActiveCodeMaxAggregateInput, {nullable:true})
    _max?: ActiveCodeMaxAggregateInput;
}
