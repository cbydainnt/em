import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionWhereInput } from './question-where.input';
import { Type } from 'class-transformer';
import { QuestionUpdateWithoutAnswersInput } from './question-update-without-answers.input';

@InputType()
export class QuestionUpdateToOneWithWhereWithoutAnswersInput {

    @Field(() => QuestionWhereInput, {nullable:true})
    @Type(() => QuestionWhereInput)
    where?: QuestionWhereInput;

    @Field(() => QuestionUpdateWithoutAnswersInput, {nullable:false})
    @Type(() => QuestionUpdateWithoutAnswersInput)
    data!: QuestionUpdateWithoutAnswersInput;
}
