import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizAnswerWhereInput } from './user-quiz-answer-where.input';

@InputType()
export class UserQuizAnswerListRelationFilter {

    @Field(() => UserQuizAnswerWhereInput, {nullable:true})
    every?: UserQuizAnswerWhereInput;

    @Field(() => UserQuizAnswerWhereInput, {nullable:true})
    some?: UserQuizAnswerWhereInput;

    @Field(() => UserQuizAnswerWhereInput, {nullable:true})
    none?: UserQuizAnswerWhereInput;
}
