import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class QuizCreateManyParent_quizInput {

    @Field(() => String, {nullable:true})
    quiz_id?: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Int, {nullable:true})
    quiz_type?: number;

    @Field(() => Int, {nullable:true})
    question_count?: number;

    @Field(() => Int, {nullable:true})
    total_questions?: number;

    @Field(() => Int, {nullable:true})
    total_points?: number;

    @Field(() => Int, {nullable:true})
    passing_score?: number;

    @Field(() => Int, {nullable:true})
    duration_minutes?: number;

    @Field(() => Int, {nullable:true})
    difficulty_level?: number;

    @Field(() => Int, {nullable:true})
    version?: number;

    @Field(() => Boolean, {nullable:true})
    is_latest_version?: boolean;

    @Field(() => String, {nullable:true})
    version_notes?: string;

    @Field(() => Boolean, {nullable:true})
    has_audio?: boolean;

    @Field(() => Boolean, {nullable:true})
    show_explanation?: boolean;

    @Field(() => Boolean, {nullable:true})
    randomize_questions?: boolean;

    @Field(() => Boolean, {nullable:true})
    randomize_answers?: boolean;

    @Field(() => Boolean, {nullable:true})
    allow_review?: boolean;

    @Field(() => Int, {nullable:true})
    max_attempts?: number;

    @Field(() => Boolean, {nullable:true})
    allow_retake?: boolean;

    @Field(() => Boolean, {nullable:true})
    show_results?: boolean;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => String, {nullable:true})
    lesson_id?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;
}
