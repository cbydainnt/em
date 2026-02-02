import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizWhereInput } from './quiz-where.input';

@InputType()
export class QuizRelationFilter {

    @Field(() => QuizWhereInput, {nullable:true})
    is?: QuizWhereInput;

    @Field(() => QuizWhereInput, {nullable:true})
    isNot?: QuizWhereInput;
}
