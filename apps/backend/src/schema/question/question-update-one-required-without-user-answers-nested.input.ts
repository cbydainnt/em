import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionCreateWithoutUser_answersInput } from './question-create-without-user-answers.input';
import { Type } from 'class-transformer';
import { QuestionCreateOrConnectWithoutUser_answersInput } from './question-create-or-connect-without-user-answers.input';
import { QuestionUpsertWithoutUser_answersInput } from './question-upsert-without-user-answers.input';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { QuestionUpdateToOneWithWhereWithoutUser_answersInput } from './question-update-to-one-with-where-without-user-answers.input';

@InputType()
export class QuestionUpdateOneRequiredWithoutUser_answersNestedInput {

    @Field(() => QuestionCreateWithoutUser_answersInput, {nullable:true})
    @Type(() => QuestionCreateWithoutUser_answersInput)
    create?: QuestionCreateWithoutUser_answersInput;

    @Field(() => QuestionCreateOrConnectWithoutUser_answersInput, {nullable:true})
    @Type(() => QuestionCreateOrConnectWithoutUser_answersInput)
    connectOrCreate?: QuestionCreateOrConnectWithoutUser_answersInput;

    @Field(() => QuestionUpsertWithoutUser_answersInput, {nullable:true})
    @Type(() => QuestionUpsertWithoutUser_answersInput)
    upsert?: QuestionUpsertWithoutUser_answersInput;

    @Field(() => QuestionWhereUniqueInput, {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    connect?: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;

    @Field(() => QuestionUpdateToOneWithWhereWithoutUser_answersInput, {nullable:true})
    @Type(() => QuestionUpdateToOneWithWhereWithoutUser_answersInput)
    update?: QuestionUpdateToOneWithWhereWithoutUser_answersInput;
}
