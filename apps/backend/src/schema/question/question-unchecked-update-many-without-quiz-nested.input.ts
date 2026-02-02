import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionCreateWithoutQuizInput } from './question-create-without-quiz.input';
import { Type } from 'class-transformer';
import { QuestionCreateOrConnectWithoutQuizInput } from './question-create-or-connect-without-quiz.input';
import { QuestionUpsertWithWhereUniqueWithoutQuizInput } from './question-upsert-with-where-unique-without-quiz.input';
import { QuestionCreateManyQuizInputEnvelope } from './question-create-many-quiz-input-envelope.input';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { QuestionUpdateWithWhereUniqueWithoutQuizInput } from './question-update-with-where-unique-without-quiz.input';
import { QuestionUpdateManyWithWhereWithoutQuizInput } from './question-update-many-with-where-without-quiz.input';
import { QuestionScalarWhereInput } from './question-scalar-where.input';

@InputType()
export class QuestionUncheckedUpdateManyWithoutQuizNestedInput {

    @Field(() => [QuestionCreateWithoutQuizInput], {nullable:true})
    @Type(() => QuestionCreateWithoutQuizInput)
    create?: Array<QuestionCreateWithoutQuizInput>;

    @Field(() => [QuestionCreateOrConnectWithoutQuizInput], {nullable:true})
    @Type(() => QuestionCreateOrConnectWithoutQuizInput)
    connectOrCreate?: Array<QuestionCreateOrConnectWithoutQuizInput>;

    @Field(() => [QuestionUpsertWithWhereUniqueWithoutQuizInput], {nullable:true})
    @Type(() => QuestionUpsertWithWhereUniqueWithoutQuizInput)
    upsert?: Array<QuestionUpsertWithWhereUniqueWithoutQuizInput>;

    @Field(() => QuestionCreateManyQuizInputEnvelope, {nullable:true})
    @Type(() => QuestionCreateManyQuizInputEnvelope)
    createMany?: QuestionCreateManyQuizInputEnvelope;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    set?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;

    @Field(() => [QuestionUpdateWithWhereUniqueWithoutQuizInput], {nullable:true})
    @Type(() => QuestionUpdateWithWhereUniqueWithoutQuizInput)
    update?: Array<QuestionUpdateWithWhereUniqueWithoutQuizInput>;

    @Field(() => [QuestionUpdateManyWithWhereWithoutQuizInput], {nullable:true})
    @Type(() => QuestionUpdateManyWithWhereWithoutQuizInput)
    updateMany?: Array<QuestionUpdateManyWithWhereWithoutQuizInput>;

    @Field(() => [QuestionScalarWhereInput], {nullable:true})
    @Type(() => QuestionScalarWhereInput)
    deleteMany?: Array<QuestionScalarWhereInput>;
}
