import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';
import { Type } from 'class-transformer';
import { LessonQuizUpdateWithoutLessonInput } from './lesson-quiz-update-without-lesson.input';

@InputType()
export class LessonQuizUpdateWithWhereUniqueWithoutLessonInput {

    @Field(() => LessonQuizWhereUniqueInput, {nullable:false})
    @Type(() => LessonQuizWhereUniqueInput)
    where!: Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>;

    @Field(() => LessonQuizUpdateWithoutLessonInput, {nullable:false})
    @Type(() => LessonQuizUpdateWithoutLessonInput)
    data!: LessonQuizUpdateWithoutLessonInput;
}
