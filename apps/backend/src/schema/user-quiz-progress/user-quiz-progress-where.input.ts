import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { FloatNullableFilter } from '../prisma/float-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { QuizRelationFilter } from '../quiz/quiz-relation-filter.input';
import { UserQuizAnswerListRelationFilter } from '../user-quiz-answer/user-quiz-answer-list-relation-filter.input';
import { LessonNullableRelationFilter } from '../lesson/lesson-nullable-relation-filter.input';
import { CourseNullableRelationFilter } from '../course/course-nullable-relation-filter.input';

@InputType()
export class UserQuizProgressWhereInput {

    @Field(() => [UserQuizProgressWhereInput], {nullable:true})
    AND?: Array<UserQuizProgressWhereInput>;

    @Field(() => [UserQuizProgressWhereInput], {nullable:true})
    OR?: Array<UserQuizProgressWhereInput>;

    @Field(() => [UserQuizProgressWhereInput], {nullable:true})
    NOT?: Array<UserQuizProgressWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    progress_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    quiz_id?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    lesson_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    course_id?: StringNullableFilter;

    @Field(() => FloatNullableFilter, {nullable:true})
    score?: FloatNullableFilter;

    @Field(() => FloatNullableFilter, {nullable:true})
    percentage?: FloatNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    total_questions?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    correct_answers?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    status?: IntFilter;

    @Field(() => BoolFilter, {nullable:true})
    passed?: BoolFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    time_spent?: IntNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    started_at?: DateTimeFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    completed_at?: DateTimeNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    attempts?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    user?: UserRelationFilter;

    @Field(() => QuizRelationFilter, {nullable:true})
    quiz?: QuizRelationFilter;

    @Field(() => UserQuizAnswerListRelationFilter, {nullable:true})
    answers?: UserQuizAnswerListRelationFilter;

    @Field(() => LessonNullableRelationFilter, {nullable:true})
    lesson?: LessonNullableRelationFilter;

    @Field(() => CourseNullableRelationFilter, {nullable:true})
    course?: CourseNullableRelationFilter;
}
