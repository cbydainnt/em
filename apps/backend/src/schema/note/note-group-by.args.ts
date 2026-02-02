import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { NoteWhereInput } from './note-where.input';
import { Type } from 'class-transformer';
import { NoteOrderByWithAggregationInput } from './note-order-by-with-aggregation.input';
import { NoteScalarFieldEnum } from './note-scalar-field.enum';
import { NoteScalarWhereWithAggregatesInput } from './note-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { NoteCountAggregateInput } from './note-count-aggregate.input';
import { NoteAvgAggregateInput } from './note-avg-aggregate.input';
import { NoteSumAggregateInput } from './note-sum-aggregate.input';
import { NoteMinAggregateInput } from './note-min-aggregate.input';
import { NoteMaxAggregateInput } from './note-max-aggregate.input';

@ArgsType()
export class NoteGroupByArgs {

    @Field(() => NoteWhereInput, {nullable:true})
    @Type(() => NoteWhereInput)
    where?: NoteWhereInput;

    @Field(() => [NoteOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<NoteOrderByWithAggregationInput>;

    @Field(() => [NoteScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof NoteScalarFieldEnum>;

    @Field(() => NoteScalarWhereWithAggregatesInput, {nullable:true})
    having?: NoteScalarWhereWithAggregatesInput;

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
