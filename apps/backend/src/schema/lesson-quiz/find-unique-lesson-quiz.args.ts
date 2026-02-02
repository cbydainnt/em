import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueLessonQuizArgs {

    @Field(() => LessonQuizWhereUniqueInput, {nullable:false})
    @Type(() => LessonQuizWhereUniqueInput)
    where!: Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>;
}
