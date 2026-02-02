import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizWhereInput } from './quiz-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyQuizArgs {

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;
}
