import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionUpdateWithoutUser_answersInput } from './question-update-without-user-answers.input';
import { Type } from 'class-transformer';
import { QuestionCreateWithoutUser_answersInput } from './question-create-without-user-answers.input';
import { QuestionWhereInput } from './question-where.input';

@InputType()
export class QuestionUpsertWithoutUser_answersInput {

    @Field(() => QuestionUpdateWithoutUser_answersInput, {nullable:false})
    @Type(() => QuestionUpdateWithoutUser_answersInput)
    update!: QuestionUpdateWithoutUser_answersInput;

    @Field(() => QuestionCreateWithoutUser_answersInput, {nullable:false})
    @Type(() => QuestionCreateWithoutUser_answersInput)
    create!: QuestionCreateWithoutUser_answersInput;

    @Field(() => QuestionWhereInput, {nullable:true})
    @Type(() => QuestionWhereInput)
    where?: QuestionWhereInput;
}
