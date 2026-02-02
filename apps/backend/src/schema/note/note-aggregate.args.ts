import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { NoteWhereInput } from './note-where.input';
import { Type } from 'class-transformer';
import { NoteOrderByWithRelationInput } from './note-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { NoteWhereUniqueInput } from './note-where-unique.input';
import { Int } from '@nestjs/graphql';
import { NoteCountAggregateInput } from './note-count-aggregate.input';
import { NoteAvgAggregateInput } from './note-avg-aggregate.input';
import { NoteSumAggregateInput } from './note-sum-aggregate.input';
import { NoteMinAggregateInput } from './note-min-aggregate.input';
import { NoteMaxAggregateInput } from './note-max-aggregate.input';

@ArgsType()
export class NoteAggregateArgs {

    @Field(() => NoteWhereInput, {nullable:true})
    @Type(() => NoteWhereInput)
    where?: NoteWhereInput;

    @Field(() => [NoteOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<NoteOrderByWithRelationInput>;

    @Field(() => NoteWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => NoteCountAggregateInput, {nullable:true})
    _count?: NoteCountAggregateInput;

    @Field(() => NoteAvgAggregateInput, {nullable:true})
    _avg?: NoteAvgAggregateInput;

    @Field(() => NoteSumAggregateInput, {nullable:true})
    _sum?: NoteSumAggregateInput;

    @Field(() => NoteMinAggregateInput, {nullable:true})
    _min?: NoteMinAggregateInput;

    @Field(() => NoteMaxAggregateInput, {nullable:true})
    _max?: NoteMaxAggregateInput;
}
