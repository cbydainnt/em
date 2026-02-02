import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizWhereInput } from './quiz-where.input';

@InputType()
export class QuizListRelationFilter {

    @Field(() => QuizWhereInput, {nullable:true})
    every?: QuizWhereInput;

    @Field(() => QuizWhereInput, {nullable:true})
    some?: QuizWhereInput;

    @Field(() => QuizWhereInput, {nullable:true})
    none?: QuizWhereInput;
}
