import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { Type } from 'class-transformer';
import { QuestionCreateWithoutUser_answersInput } from './question-create-without-user-answers.input';

@InputType()
export class QuestionCreateOrConnectWithoutUser_answersInput {

    @Field(() => QuestionWhereUniqueInput, {nullable:false})
    @Type(() => QuestionWhereUniqueInput)
    where!: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;

    @Field(() => QuestionCreateWithoutUser_answersInput, {nullable:false})
    @Type(() => QuestionCreateWithoutUser_answersInput)
    create!: QuestionCreateWithoutUser_answersInput;
}
