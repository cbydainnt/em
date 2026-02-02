import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { NoteCountAggregate } from './note-count-aggregate.output';
import { NoteAvgAggregate } from './note-avg-aggregate.output';
import { NoteSumAggregate } from './note-sum-aggregate.output';
import { NoteMinAggregate } from './note-min-aggregate.output';
import { NoteMaxAggregate } from './note-max-aggregate.output';

@ObjectType()
export class NoteGroupBy {

    @Field(() => String, {nullable:false})
    note_id!: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Int, {nullable:false})
    timestamp!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    lesson_id!: string;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => String, {nullable:true})
    background_color?: string;

    @Field(() => NoteCountAggregate, {nullable:true})
    _count?: NoteCountAggregate;

    @Field(() => NoteAvgAggregate, {nullable:true})
    _avg?: NoteAvgAggregate;

    @Field(() => NoteSumAggregate, {nullable:true})
    _sum?: NoteSumAggregate;

    @Field(() => NoteMinAggregate, {nullable:true})
    _min?: NoteMinAggregate;

    @Field(() => NoteMaxAggregate, {nullable:true})
    _max?: NoteMaxAggregate;
}
