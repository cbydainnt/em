import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class NoteCountAggregate {

    @Field(() => Int, {nullable:false})
    note_id!: number;

    @Field(() => Int, {nullable:false})
    content!: number;

    @Field(() => Int, {nullable:false})
    timestamp!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    user_id!: number;

    @Field(() => Int, {nullable:false})
    lesson_id!: number;

    @Field(() => Int, {nullable:false})
    del_flg!: number;

    @Field(() => Int, {nullable:false})
    background_color!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
