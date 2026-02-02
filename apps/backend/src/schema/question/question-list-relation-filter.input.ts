import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionWhereInput } from './question-where.input';

@InputType()
export class QuestionListRelationFilter {

    @Field(() => QuestionWhereInput, {nullable:true})
    every?: QuestionWhereInput;

    @Field(() => QuestionWhereInput, {nullable:true})
    some?: QuestionWhereInput;

    @Field(() => QuestionWhereInput, {nullable:true})
    none?: QuestionWhereInput;
}
