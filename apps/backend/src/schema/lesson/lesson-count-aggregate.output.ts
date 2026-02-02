import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class LessonCountAggregate {

    @Field(() => Int, {nullable:false})
    lesson_id!: number;

    @Field(() => Int, {nullable:false})
    lesson_title!: number;

    @Field(() => Int, {nullable:false})
    lesson_type!: number;

    @Field(() => Int, {nullable:false})
    lesson_video!: number;

    @Field(() => Int, {nullable:false})
    lesson_thumbnail!: number;

    @Field(() => Int, {nullable:false})
    lesson_order!: number;

    @Field(() => Int, {nullable:false})
    minutes!: number;

    @Field(() => Int, {nullable:false})
    video_duration!: number;

    @Field(() => Int, {nullable:false})
    access_type!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    created_by!: number;

    @Field(() => Int, {nullable:false})
    updated_by!: number;

    @Field(() => Int, {nullable:false})
    del_flg!: number;

    @Field(() => Int, {nullable:false})
    section_id!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
