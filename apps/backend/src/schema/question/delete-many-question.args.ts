import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuestionWhereInput } from './question-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyQuestionArgs {

    @Field(() => QuestionWhereInput, {nullable:true})
    @Type(() => QuestionWhereInput)
    where?: QuestionWhereInput;
}
