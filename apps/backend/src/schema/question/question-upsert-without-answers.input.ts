import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionUpdateWithoutAnswersInput } from './question-update-without-answers.input';
import { Type } from 'class-transformer';
import { QuestionCreateWithoutAnswersInput } from './question-create-without-answers.input';
import { QuestionWhereInput } from './question-where.input';

@InputType()
export class QuestionUpsertWithoutAnswersInput {

    @Field(() => QuestionUpdateWithoutAnswersInput, {nullable:false})
    @Type(() => QuestionUpdateWithoutAnswersInput)
    update!: QuestionUpdateWithoutAnswersInput;

    @Field(() => QuestionCreateWithoutAnswersInput, {nullable:false})
    @Type(() => QuestionCreateWithoutAnswersInput)
    create!: QuestionCreateWithoutAnswersInput;

    @Field(() => QuestionWhereInput, {nullable:true})
    @Type(() => QuestionWhereInput)
    where?: QuestionWhereInput;
}
