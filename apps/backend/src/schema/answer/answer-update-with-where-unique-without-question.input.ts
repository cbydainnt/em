import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { AnswerWhereUniqueInput } from './answer-where-unique.input';
import { Type } from 'class-transformer';
import { AnswerUpdateWithoutQuestionInput } from './answer-update-without-question.input';

@InputType()
export class AnswerUpdateWithWhereUniqueWithoutQuestionInput {

    @Field(() => AnswerWhereUniqueInput, {nullable:false})
    @Type(() => AnswerWhereUniqueInput)
    where!: Prisma.AtLeast<AnswerWhereUniqueInput, 'answer_id'>;

    @Field(() => AnswerUpdateWithoutQuestionInput, {nullable:false})
    @Type(() => AnswerUpdateWithoutQuestionInput)
    data!: AnswerUpdateWithoutQuestionInput;
}
