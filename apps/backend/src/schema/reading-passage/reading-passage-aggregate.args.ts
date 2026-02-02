import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReadingPassageWhereInput } from './reading-passage-where.input';
import { Type } from 'class-transformer';
import { ReadingPassageOrderByWithRelationInput } from './reading-passage-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ReadingPassageWhereUniqueInput } from './reading-passage-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ReadingPassageCountAggregateInput } from './reading-passage-count-aggregate.input';
import { ReadingPassageAvgAggregateInput } from './reading-passage-avg-aggregate.input';
import { ReadingPassageSumAggregateInput } from './reading-passage-sum-aggregate.input';
import { ReadingPassageMinAggregateInput } from './reading-passage-min-aggregate.input';
import { ReadingPassageMaxAggregateInput } from './reading-passage-max-aggregate.input';

@ArgsType()
export class ReadingPassageAggregateArgs {

    @Field(() => ReadingPassageWhereInput, {nullable:true})
    @Type(() => ReadingPassageWhereInput)
    where?: ReadingPassageWhereInput;

    @Field(() => [ReadingPassageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ReadingPassageOrderByWithRelationInput>;

    @Field(() => ReadingPassageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ReadingPassageWhereUniqueInput, 'reading_passage_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ReadingPassageCountAggregateInput, {nullable:true})
    _count?: ReadingPassageCountAggregateInput;

    @Field(() => ReadingPassageAvgAggregateInput, {nullable:true})
    _avg?: ReadingPassageAvgAggregateInput;

    @Field(() => ReadingPassageSumAggregateInput, {nullable:true})
    _sum?: ReadingPassageSumAggregateInput;

    @Field(() => ReadingPassageMinAggregateInput, {nullable:true})
    _min?: ReadingPassageMinAggregateInput;

    @Field(() => ReadingPassageMaxAggregateInput, {nullable:true})
    _max?: ReadingPassageMaxAggregateInput;
}
