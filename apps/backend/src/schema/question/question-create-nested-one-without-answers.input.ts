import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionCreateWithoutAnswersInput } from './question-create-without-answers.input';
import { Type } from 'class-transformer';
import { QuestionCreateOrConnectWithoutAnswersInput } from './question-create-or-connect-without-answers.input';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';

@InputType()
export class QuestionCreateNestedOneWithoutAnswersInput {

    @Field(() => QuestionCreateWithoutAnswersInput, {nullable:true})
    @Type(() => QuestionCreateWithoutAnswersInput)
    create?: QuestionCreateWithoutAnswersInput;

    @Field(() => QuestionCreateOrConnectWithoutAnswersInput, {nullable:true})
    @Type(() => QuestionCreateOrConnectWithoutAnswersInput)
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswersInput;

    @Field(() => QuestionWhereUniqueInput, {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    connect?: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;
}
