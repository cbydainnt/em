import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { AnswerCreateWithoutQuestionInput } from './answer-create-without-question.input';
import { Type } from 'class-transformer';
import { AnswerCreateOrConnectWithoutQuestionInput } from './answer-create-or-connect-without-question.input';
import { AnswerUpsertWithWhereUniqueWithoutQuestionInput } from './answer-upsert-with-where-unique-without-question.input';
import { AnswerCreateManyQuestionInputEnvelope } from './answer-create-many-question-input-envelope.input';
import { Prisma } from '@prisma/client';
import { AnswerWhereUniqueInput } from './answer-where-unique.input';
import { AnswerUpdateWithWhereUniqueWithoutQuestionInput } from './answer-update-with-where-unique-without-question.input';
import { AnswerUpdateManyWithWhereWithoutQuestionInput } from './answer-update-many-with-where-without-question.input';
import { AnswerScalarWhereInput } from './answer-scalar-where.input';

@InputType()
export class AnswerUpdateManyWithoutQuestionNestedInput {

    @Field(() => [AnswerCreateWithoutQuestionInput], {nullable:true})
    @Type(() => AnswerCreateWithoutQuestionInput)
    create?: Array<AnswerCreateWithoutQuestionInput>;

    @Field(() => [AnswerCreateOrConnectWithoutQuestionInput], {nullable:true})
    @Type(() => AnswerCreateOrConnectWithoutQuestionInput)
    connectOrCreate?: Array<AnswerCreateOrConnectWithoutQuestionInput>;

    @Field(() => [AnswerUpsertWithWhereUniqueWithoutQuestionInput], {nullable:true})
    @Type(() => AnswerUpsertWithWhereUniqueWithoutQuestionInput)
    upsert?: Array<AnswerUpsertWithWhereUniqueWithoutQuestionInput>;

    @Field(() => AnswerCreateManyQuestionInputEnvelope, {nullable:true})
    @Type(() => AnswerCreateManyQuestionInputEnvelope)
    createMany?: AnswerCreateManyQuestionInputEnvelope;

    @Field(() => [AnswerWhereUniqueInput], {nullable:true})
    @Type(() => AnswerWhereUniqueInput)
    set?: Array<Prisma.AtLeast<AnswerWhereUniqueInput, 'answer_id'>>;

    @Field(() => [AnswerWhereUniqueInput], {nullable:true})
    @Type(() => AnswerWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<AnswerWhereUniqueInput, 'answer_id'>>;

    @Field(() => [AnswerWhereUniqueInput], {nullable:true})
    @Type(() => AnswerWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<AnswerWhereUniqueInput, 'answer_id'>>;

    @Field(() => [AnswerWhereUniqueInput], {nullable:true})
    @Type(() => AnswerWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<AnswerWhereUniqueInput, 'answer_id'>>;

    @Field(() => [AnswerUpdateWithWhereUniqueWithoutQuestionInput], {nullable:true})
    @Type(() => AnswerUpdateWithWhereUniqueWithoutQuestionInput)
    update?: Array<AnswerUpdateWithWhereUniqueWithoutQuestionInput>;

    @Field(() => [AnswerUpdateManyWithWhereWithoutQuestionInput], {nullable:true})
    @Type(() => AnswerUpdateManyWithWhereWithoutQuestionInput)
    updateMany?: Array<AnswerUpdateManyWithWhereWithoutQuestionInput>;

    @Field(() => [AnswerScalarWhereInput], {nullable:true})
    @Type(() => AnswerScalarWhereInput)
    deleteMany?: Array<AnswerScalarWhereInput>;
}
