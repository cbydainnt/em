import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';
import { Type } from 'class-transformer';
import { LessonQuizCreateWithoutQuizInput } from './lesson-quiz-create-without-quiz.input';

@InputType()
export class LessonQuizCreateOrConnectWithoutQuizInput {

    @Field(() => LessonQuizWhereUniqueInput, {nullable:false})
    @Type(() => LessonQuizWhereUniqueInput)
    where!: Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>;

    @Field(() => LessonQuizCreateWithoutQuizInput, {nullable:false})
    @Type(() => LessonQuizCreateWithoutQuizInput)
    create!: LessonQuizCreateWithoutQuizInput;
}
