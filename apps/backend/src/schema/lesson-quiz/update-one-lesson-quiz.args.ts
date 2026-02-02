import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonQuizUpdateInput } from './lesson-quiz-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';

@ArgsType()
export class UpdateOneLessonQuizArgs {

    @Field(() => LessonQuizUpdateInput, {nullable:false})
    @Type(() => LessonQuizUpdateInput)
    data!: LessonQuizUpdateInput;

    @Field(() => LessonQuizWhereUniqueInput, {nullable:false})
    @Type(() => LessonQuizWhereUniqueInput)
    where!: Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>;
}
