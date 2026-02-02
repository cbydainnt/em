import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { AnswerWhereUniqueInput } from './answer-where-unique.input';
import { Type } from 'class-transformer';
import { AnswerCreateWithoutQuestionInput } from './answer-create-without-question.input';

@InputType()
export class AnswerCreateOrConnectWithoutQuestionInput {

    @Field(() => AnswerWhereUniqueInput, {nullable:false})
    @Type(() => AnswerWhereUniqueInput)
    where!: Prisma.AtLeast<AnswerWhereUniqueInput, 'answer_id'>;

    @Field(() => AnswerCreateWithoutQuestionInput, {nullable:false})
    @Type(() => AnswerCreateWithoutQuestionInput)
    create!: AnswerCreateWithoutQuestionInput;
}
