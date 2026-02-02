import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class QuizCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    quiz_id?: true;

    @Field(() => Boolean, {nullable:true})
    title?: true;

    @Field(() => Boolean, {nullable:true})
    quiz_type?: true;

    @Field(() => Boolean, {nullable:true})
    question_count?: true;

    @Field(() => Boolean, {nullable:true})
    total_questions?: true;

    @Field(() => Boolean, {nullable:true})
    total_points?: true;

    @Field(() => Boolean, {nullable:true})
    passing_score?: true;

    @Field(() => Boolean, {nullable:true})
    duration_minutes?: true;

    @Field(() => Boolean, {nullable:true})
    difficulty_level?: true;

    @Field(() => Boolean, {nullable:true})
    version?: true;

    @Field(() => Boolean, {nullable:true})
    parent_quiz_id?: true;

    @Field(() => Boolean, {nullable:true})
    is_latest_version?: true;

    @Field(() => Boolean, {nullable:true})
    version_notes?: true;

    @Field(() => Boolean, {nullable:true})
    has_audio?: true;

    @Field(() => Boolean, {nullable:true})
    show_explanation?: true;

    @Field(() => Boolean, {nullable:true})
    randomize_questions?: true;

    @Field(() => Boolean, {nullable:true})
    randomize_answers?: true;

    @Field(() => Boolean, {nullable:true})
    allow_review?: true;

    @Field(() => Boolean, {nullable:true})
    max_attempts?: true;

    @Field(() => Boolean, {nullable:true})
    allow_retake?: true;

    @Field(() => Boolean, {nullable:true})
    show_results?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    del_flg?: true;

    @Field(() => Boolean, {nullable:true})
    lesson_id?: true;

    @Field(() => Boolean, {nullable:true})
    course_id?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
