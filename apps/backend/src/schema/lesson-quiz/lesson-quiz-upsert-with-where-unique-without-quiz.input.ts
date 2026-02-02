import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';
import { Type } from 'class-transformer';
import { LessonQuizUpdateWithoutQuizInput } from './lesson-quiz-update-without-quiz.input';
import { LessonQuizCreateWithoutQuizInput } from './lesson-quiz-create-without-quiz.input';

@InputType()
export class LessonQuizUpsertWithWhereUniqueWithoutQuizInput {

    @Field(() => LessonQuizWhereUniqueInput, {nullable:false})
    @Type(() => LessonQuizWhereUniqueInput)
    where!: Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>;

    @Field(() => LessonQuizUpdateWithoutQuizInput, {nullable:false})
    @Type(() => LessonQuizUpdateWithoutQuizInput)
    update!: LessonQuizUpdateWithoutQuizInput;

    @Field(() => LessonQuizCreateWithoutQuizInput, {nullable:false})
    @Type(() => LessonQuizCreateWithoutQuizInput)
    create!: LessonQuizCreateWithoutQuizInput;
}
