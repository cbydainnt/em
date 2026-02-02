import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { Type } from 'class-transformer';
import { QuizUpdateWithoutLessonInput } from './quiz-update-without-lesson.input';

@InputType()
export class QuizUpdateWithWhereUniqueWithoutLessonInput {

    @Field(() => QuizWhereUniqueInput, {nullable:false})
    @Type(() => QuizWhereUniqueInput)
    where!: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizUpdateWithoutLessonInput, {nullable:false})
    @Type(() => QuizUpdateWithoutLessonInput)
    data!: QuizUpdateWithoutLessonInput;
}
