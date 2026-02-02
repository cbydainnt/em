import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressWhereInput } from './user-quiz-progress-where.input';

@InputType()
export class UserQuizProgressRelationFilter {

    @Field(() => UserQuizProgressWhereInput, {nullable:true})
    is?: UserQuizProgressWhereInput;

    @Field(() => UserQuizProgressWhereInput, {nullable:true})
    isNot?: UserQuizProgressWhereInput;
}
