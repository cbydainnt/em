import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboWhereInput } from './combo-where.input';
import { Type } from 'class-transformer';
import { ComboOrderByWithRelationInput } from './combo-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ComboCountAggregateInput } from './combo-count-aggregate.input';
import { ComboAvgAggregateInput } from './combo-avg-aggregate.input';
import { ComboSumAggregateInput } from './combo-sum-aggregate.input';
import { ComboMinAggregateInput } from './combo-min-aggregate.input';
import { ComboMaxAggregateInput } from './combo-max-aggregate.input';

@ArgsType()
export class ComboAggregateArgs {

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    where?: ComboWhereInput;

    @Field(() => [ComboOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ComboOrderByWithRelationInput>;

    @Field(() => ComboWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ComboCountAggregateInput, {nullable:true})
    _count?: ComboCountAggregateInput;

    @Field(() => ComboAvgAggregateInput, {nullable:true})
    _avg?: ComboAvgAggregateInput;

    @Field(() => ComboSumAggregateInput, {nullable:true})
    _sum?: ComboSumAggregateInput;

    @Field(() => ComboMinAggregateInput, {nullable:true})
    _min?: ComboMinAggregateInput;

    @Field(() => ComboMaxAggregateInput, {nullable:true})
    _max?: ComboMaxAggregateInput;
}
