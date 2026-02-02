import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { QuizCountAggregate } from './quiz-count-aggregate.output';
import { QuizAvgAggregate } from './quiz-avg-aggregate.output';
import { QuizSumAggregate } from './quiz-sum-aggregate.output';
import { QuizMinAggregate } from './quiz-min-aggregate.output';
import { QuizMaxAggregate } from './quiz-max-aggregate.output';

@ObjectType()
export class QuizGroupBy {

    @Field(() => String, {nullable:false})
    quiz_id!: string;

    @Field(() => String, {nullable:false})
    title!: string;

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

    @Field(() => Int, {nullable:true})
    duration_minutes?: number;

    @Field(() => Int, {nullable:false})
    difficulty_level!: number;

    @Field(() => Int, {nullable:false})
    version!: number;

    @Field(() => String, {nullable:true})
    parent_quiz_id?: string;

    @Field(() => Boolean, {nullable:false})
    is_latest_version!: boolean;

    @Field(() => String, {nullable:true})
    version_notes?: string;

    @Field(() => Boolean, {nullable:false})
    has_audio!: boolean;

    @Field(() => Boolean, {nullable:false})
    show_explanation!: boolean;

    @Field(() => Boolean, {nullable:false})
    randomize_questions!: boolean;

    @Field(() => Boolean, {nullable:false})
    randomize_answers!: boolean;

    @Field(() => Boolean, {nullable:false})
    allow_review!: boolean;

    @Field(() => Int, {nullable:true})
    max_attempts?: number;

    @Field(() => Boolean, {nullable:false})
    allow_retake!: boolean;

    @Field(() => Boolean, {nullable:false})
    show_results!: boolean;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => String, {nullable:true})
    lesson_id?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => QuizCountAggregate, {nullable:true})
    _count?: QuizCountAggregate;

    @Field(() => QuizAvgAggregate, {nullable:true})
    _avg?: QuizAvgAggregate;

    @Field(() => QuizSumAggregate, {nullable:true})
    _sum?: QuizSumAggregate;

    @Field(() => QuizMinAggregate, {nullable:true})
    _min?: QuizMinAggregate;

    @Field(() => QuizMaxAggregate, {nullable:true})
    _max?: QuizMaxAggregate;
}
