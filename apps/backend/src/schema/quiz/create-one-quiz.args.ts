import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizCreateInput } from './quiz-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneQuizArgs {

    @Field(() => QuizCreateInput, {nullable:false})
    @Type(() => QuizCreateInput)
    data!: QuizCreateInput;
}
