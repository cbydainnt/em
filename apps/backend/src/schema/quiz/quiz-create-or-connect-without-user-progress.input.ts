import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { Type } from 'class-transformer';
import { QuizCreateWithoutUser_progressInput } from './quiz-create-without-user-progress.input';

@InputType()
export class QuizCreateOrConnectWithoutUser_progressInput {

    @Field(() => QuizWhereUniqueInput, {nullable:false})
    @Type(() => QuizWhereUniqueInput)
    where!: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizCreateWithoutUser_progressInput, {nullable:false})
    @Type(() => QuizCreateWithoutUser_progressInput)
    create!: QuizCreateWithoutUser_progressInput;
}
