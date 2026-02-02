import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class QuizCountAggregate {

    @Field(() => Int, {nullable:false})
    quiz_id!: number;

    @Field(() => Int, {nullable:false})
    title!: number;

    @Field(() => Int, {nullable:false})
    quiz_type!: number;

    @Field(() => Int, {nullable:false})
    question_count!: number;

    @Field(() => Int, {nullable:false})
    total_questions!: number;

    @Field(() => Int, {nullable:false})
    total_points!: number;

    @Field(() => Int, {nullable:false})
    passing_score!: number;

    @Field(() => Int, {nullable:false})
    duration_minutes!: number;

    @Field(() => Int, {nullable:false})
    difficulty_level!: number;

    @Field(() => Int, {nullable:false})
    version!: number;

    @Field(() => Int, {nullable:false})
    parent_quiz_id!: number;

    @Field(() => Int, {nullable:false})
    is_latest_version!: number;

    @Field(() => Int, {nullable:false})
    version_notes!: number;

    @Field(() => Int, {nullable:false})
    has_audio!: number;

    @Field(() => Int, {nullable:false})
    show_explanation!: number;

    @Field(() => Int, {nullable:false})
    randomize_questions!: number;

    @Field(() => Int, {nullable:false})
    randomize_answers!: number;

    @Field(() => Int, {nullable:false})
    allow_review!: number;

    @Field(() => Int, {nullable:false})
    max_attempts!: number;

    @Field(() => Int, {nullable:false})
    allow_retake!: number;

    @Field(() => Int, {nullable:false})
    show_results!: number;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    del_flg!: number;

    @Field(() => Int, {nullable:false})
    lesson_id!: number;

    @Field(() => Int, {nullable:false})
    course_id!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
