import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionCreateWithoutAnswersInput } from './question-create-without-answers.input';
import { Type } from 'class-transformer';
import { QuestionCreateOrConnectWithoutAnswersInput } from './question-create-or-connect-without-answers.input';
import { QuestionUpsertWithoutAnswersInput } from './question-upsert-without-answers.input';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { QuestionUpdateToOneWithWhereWithoutAnswersInput } from './question-update-to-one-with-where-without-answers.input';

@InputType()
export class QuestionUpdateOneRequiredWithoutAnswersNestedInput {

    @Field(() => QuestionCreateWithoutAnswersInput, {nullable:true})
    @Type(() => QuestionCreateWithoutAnswersInput)
    create?: QuestionCreateWithoutAnswersInput;

    @Field(() => QuestionCreateOrConnectWithoutAnswersInput, {nullable:true})
    @Type(() => QuestionCreateOrConnectWithoutAnswersInput)
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswersInput;

    @Field(() => QuestionUpsertWithoutAnswersInput, {nullable:true})
    @Type(() => QuestionUpsertWithoutAnswersInput)
    upsert?: QuestionUpsertWithoutAnswersInput;

    @Field(() => QuestionWhereUniqueInput, {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    connect?: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;

    @Field(() => QuestionUpdateToOneWithWhereWithoutAnswersInput, {nullable:true})
    @Type(() => QuestionUpdateToOneWithWhereWithoutAnswersInput)
    update?: QuestionUpdateToOneWithWhereWithoutAnswersInput;
}
