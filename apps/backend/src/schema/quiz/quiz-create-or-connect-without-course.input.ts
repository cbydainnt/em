import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { Type } from 'class-transformer';
import { QuizCreateWithoutCourseInput } from './quiz-create-without-course.input';

@InputType()
export class QuizCreateOrConnectWithoutCourseInput {

    @Field(() => QuizWhereUniqueInput, {nullable:false})
    @Type(() => QuizWhereUniqueInput)
    where!: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizCreateWithoutCourseInput, {nullable:false})
    @Type(() => QuizCreateWithoutCourseInput)
    create!: QuizCreateWithoutCourseInput;
}
