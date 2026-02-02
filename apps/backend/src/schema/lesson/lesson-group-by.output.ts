import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LessonCountAggregate } from './lesson-count-aggregate.output';
import { LessonAvgAggregate } from './lesson-avg-aggregate.output';
import { LessonSumAggregate } from './lesson-sum-aggregate.output';
import { LessonMinAggregate } from './lesson-min-aggregate.output';
import { LessonMaxAggregate } from './lesson-max-aggregate.output';

@ObjectType()
export class LessonGroupBy {

    @Field(() => String, {nullable:false})
    lesson_id!: string;

    @Field(() => String, {nullable:false})
    lesson_title!: string;

    @Field(() => Int, {nullable:false})
    lesson_type!: number;

    @Field(() => String, {nullable:true})
    lesson_video?: string;

    @Field(() => String, {nullable:true})
    lesson_thumbnail?: string;

    @Field(() => Int, {nullable:false})
    lesson_order!: number;

    @Field(() => Int, {nullable:false})
    minutes!: number;

    @Field(() => Int, {nullable:false})
    video_duration!: number;

    @Field(() => Int, {nullable:false})
    access_type!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => String, {nullable:false})
    section_id!: string;

    @Field(() => LessonCountAggregate, {nullable:true})
    _count?: LessonCountAggregate;

    @Field(() => LessonAvgAggregate, {nullable:true})
    _avg?: LessonAvgAggregate;

    @Field(() => LessonSumAggregate, {nullable:true})
    _sum?: LessonSumAggregate;

    @Field(() => LessonMinAggregate, {nullable:true})
    _min?: LessonMinAggregate;

    @Field(() => LessonMaxAggregate, {nullable:true})
    _max?: LessonMaxAggregate;
}
