import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressWhereInput } from './user-quiz-progress-where.input';

@InputType()
export class UserQuizProgressListRelationFilter {

    @Field(() => UserQuizProgressWhereInput, {nullable:true})
    every?: UserQuizProgressWhereInput;

    @Field(() => UserQuizProgressWhereInput, {nullable:true})
    some?: UserQuizProgressWhereInput;

    @Field(() => UserQuizProgressWhereInput, {nullable:true})
    none?: UserQuizProgressWhereInput;
}
