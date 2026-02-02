import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuestionCreateInput } from './question-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneQuestionArgs {

    @Field(() => QuestionCreateInput, {nullable:false})
    @Type(() => QuestionCreateInput)
    data!: QuestionCreateInput;
}
