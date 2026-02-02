import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';
import { Type } from 'class-transformer';
import { LessonQuizUpdateWithoutLessonInput } from './lesson-quiz-update-without-lesson.input';
import { LessonQuizCreateWithoutLessonInput } from './lesson-quiz-create-without-lesson.input';

@InputType()
export class LessonQuizUpsertWithWhereUniqueWithoutLessonInput {

    @Field(() => LessonQuizWhereUniqueInput, {nullable:false})
    @Type(() => LessonQuizWhereUniqueInput)
    where!: Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>;

    @Field(() => LessonQuizUpdateWithoutLessonInput, {nullable:false})
    @Type(() => LessonQuizUpdateWithoutLessonInput)
    update!: LessonQuizUpdateWithoutLessonInput;

    @Field(() => LessonQuizCreateWithoutLessonInput, {nullable:false})
    @Type(() => LessonQuizCreateWithoutLessonInput)
    create!: LessonQuizCreateWithoutLessonInput;
}
