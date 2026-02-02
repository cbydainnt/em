import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { AnswerCreateWithoutQuestionInput } from './answer-create-without-question.input';
import { Type } from 'class-transformer';
import { AnswerCreateOrConnectWithoutQuestionInput } from './answer-create-or-connect-without-question.input';
import { AnswerCreateManyQuestionInputEnvelope } from './answer-create-many-question-input-envelope.input';
import { Prisma } from '@prisma/client';
import { AnswerWhereUniqueInput } from './answer-where-unique.input';

@InputType()
export class AnswerUncheckedCreateNestedManyWithoutQuestionInput {

    @Field(() => [AnswerCreateWithoutQuestionInput], {nullable:true})
    @Type(() => AnswerCreateWithoutQuestionInput)
    create?: Array<AnswerCreateWithoutQuestionInput>;

    @Field(() => [AnswerCreateOrConnectWithoutQuestionInput], {nullable:true})
    @Type(() => AnswerCreateOrConnectWithoutQuestionInput)
    connectOrCreate?: Array<AnswerCreateOrConnectWithoutQuestionInput>;

    @Field(() => AnswerCreateManyQuestionInputEnvelope, {nullable:true})
    @Type(() => AnswerCreateManyQuestionInputEnvelope)
    createMany?: AnswerCreateManyQuestionInputEnvelope;

    @Field(() => [AnswerWhereUniqueInput], {nullable:true})
    @Type(() => AnswerWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<AnswerWhereUniqueInput, 'answer_id'>>;
}
