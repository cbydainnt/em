import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionWhereInput } from './question-where.input';
import { Type } from 'class-transformer';
import { QuestionUpdateWithoutUser_answersInput } from './question-update-without-user-answers.input';

@InputType()
export class QuestionUpdateToOneWithWhereWithoutUser_answersInput {

    @Field(() => QuestionWhereInput, {nullable:true})
    @Type(() => QuestionWhereInput)
    where?: QuestionWhereInput;

    @Field(() => QuestionUpdateWithoutUser_answersInput, {nullable:false})
    @Type(() => QuestionUpdateWithoutUser_answersInput)
    data!: QuestionUpdateWithoutUser_answersInput;
}
