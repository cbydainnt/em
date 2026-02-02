import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';
import { Type } from 'class-transformer';
import { LessonQuizUpdateWithoutQuizInput } from './lesson-quiz-update-without-quiz.input';

@InputType()
export class LessonQuizUpdateWithWhereUniqueWithoutQuizInput {

    @Field(() => LessonQuizWhereUniqueInput, {nullable:false})
    @Type(() => LessonQuizWhereUniqueInput)
    where!: Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>;

    @Field(() => LessonQuizUpdateWithoutQuizInput, {nullable:false})
    @Type(() => LessonQuizUpdateWithoutQuizInput)
    data!: LessonQuizUpdateWithoutQuizInput;
}
