import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { Type } from 'class-transformer';
import { QuizUpdateWithoutCourseInput } from './quiz-update-without-course.input';

@InputType()
export class QuizUpdateWithWhereUniqueWithoutCourseInput {

    @Field(() => QuizWhereUniqueInput, {nullable:false})
    @Type(() => QuizWhereUniqueInput)
    where!: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizUpdateWithoutCourseInput, {nullable:false})
    @Type(() => QuizUpdateWithoutCourseInput)
    data!: QuizUpdateWithoutCourseInput;
}
