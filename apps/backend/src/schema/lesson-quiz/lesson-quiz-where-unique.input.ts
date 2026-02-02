import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonQuizLesson_idQuiz_idCompoundUniqueInput } from './lesson-quiz-lesson-id-quiz-id-compound-unique.input';
import { LessonQuizWhereInput } from './lesson-quiz-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { LessonRelationFilter } from '../lesson/lesson-relation-filter.input';
import { QuizRelationFilter } from '../quiz/quiz-relation-filter.input';

@InputType()
export class LessonQuizWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => LessonQuizLesson_idQuiz_idCompoundUniqueInput, {nullable:true})
    lesson_id_quiz_id?: LessonQuizLesson_idQuiz_idCompoundUniqueInput;

    @Field(() => [LessonQuizWhereInput], {nullable:true})
    AND?: Array<LessonQuizWhereInput>;

    @Field(() => [LessonQuizWhereInput], {nullable:true})
    OR?: Array<LessonQuizWhereInput>;

    @Field(() => [LessonQuizWhereInput], {nullable:true})
    NOT?: Array<LessonQuizWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    lesson_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    quiz_id?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    order?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => LessonRelationFilter, {nullable:true})
    lesson?: LessonRelationFilter;

    @Field(() => QuizRelationFilter, {nullable:true})
    quiz?: QuizRelationFilter;
}
