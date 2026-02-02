import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DocumentWhereInput } from './document-where.input';
import { Type } from 'class-transformer';
import { DocumentOrderByWithRelationInput } from './document-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { DocumentWhereUniqueInput } from './document-where-unique.input';
import { Int } from '@nestjs/graphql';
import { DocumentCountAggregateInput } from './document-count-aggregate.input';
import { DocumentAvgAggregateInput } from './document-avg-aggregate.input';
import { DocumentSumAggregateInput } from './document-sum-aggregate.input';
import { DocumentMinAggregateInput } from './document-min-aggregate.input';
import { DocumentMaxAggregateInput } from './document-max-aggregate.input';

@ArgsType()
export class DocumentAggregateArgs {

    @Field(() => DocumentWhereInput, {nullable:true})
    @Type(() => DocumentWhereInput)
    where?: DocumentWhereInput;

    @Field(() => [DocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DocumentOrderByWithRelationInput>;

    @Field(() => DocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DocumentWhereUniqueInput, 'document_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => DocumentCountAggregateInput, {nullable:true})
    _count?: DocumentCountAggregateInput;

    @Field(() => DocumentAvgAggregateInput, {nullable:true})
    _avg?: DocumentAvgAggregateInput;

    @Field(() => DocumentSumAggregateInput, {nullable:true})
    _sum?: DocumentSumAggregateInput;

    @Field(() => DocumentMinAggregateInput, {nullable:true})
    _min?: DocumentMinAggregateInput;

    @Field(() => DocumentMaxAggregateInput, {nullable:true})
    _max?: DocumentMaxAggregateInput;
}
