import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizCreateManyInput } from './quiz-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyQuizArgs {

    @Field(() => [QuizCreateManyInput], {nullable:false})
    @Type(() => QuizCreateManyInput)
    data!: Array<QuizCreateManyInput>;
}
