import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';
import { Type } from 'class-transformer';
import { LessonQuizCreateInput } from './lesson-quiz-create.input';
import { LessonQuizUpdateInput } from './lesson-quiz-update.input';

@ArgsType()
export class UpsertOneLessonQuizArgs {

    @Field(() => LessonQuizWhereUniqueInput, {nullable:false})
    @Type(() => LessonQuizWhereUniqueInput)
    where!: Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>;

    @Field(() => LessonQuizCreateInput, {nullable:false})
    @Type(() => LessonQuizCreateInput)
    create!: LessonQuizCreateInput;

    @Field(() => LessonQuizUpdateInput, {nullable:false})
    @Type(() => LessonQuizUpdateInput)
    update!: LessonQuizUpdateInput;
}
