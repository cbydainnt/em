import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MSystemWhereInput } from './m-system-where.input';
import { Type } from 'class-transformer';
import { MSystemOrderByWithRelationInput } from './m-system-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { MSystemWhereUniqueInput } from './m-system-where-unique.input';
import { Int } from '@nestjs/graphql';
import { MSystemCountAggregateInput } from './m-system-count-aggregate.input';
import { MSystemAvgAggregateInput } from './m-system-avg-aggregate.input';
import { MSystemSumAggregateInput } from './m-system-sum-aggregate.input';
import { MSystemMinAggregateInput } from './m-system-min-aggregate.input';
import { MSystemMaxAggregateInput } from './m-system-max-aggregate.input';

@ArgsType()
export class MSystemAggregateArgs {

    @Field(() => MSystemWhereInput, {nullable:true})
    @Type(() => MSystemWhereInput)
    where?: MSystemWhereInput;

    @Field(() => [MSystemOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<MSystemOrderByWithRelationInput>;

    @Field(() => MSystemWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<MSystemWhereUniqueInput, 'id' | 'param_key_param_no'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => MSystemCountAggregateInput, {nullable:true})
    _count?: MSystemCountAggregateInput;

    @Field(() => MSystemAvgAggregateInput, {nullable:true})
    _avg?: MSystemAvgAggregateInput;

    @Field(() => MSystemSumAggregateInput, {nullable:true})
    _sum?: MSystemSumAggregateInput;

    @Field(() => MSystemMinAggregateInput, {nullable:true})
    _min?: MSystemMinAggregateInput;

    @Field(() => MSystemMaxAggregateInput, {nullable:true})
    _max?: MSystemMaxAggregateInput;
}
