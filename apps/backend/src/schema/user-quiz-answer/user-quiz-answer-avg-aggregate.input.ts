import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserQuizAnswerAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    points_earned?: true;

    @Field(() => Boolean, {nullable:true})
    time_spent?: true;
}
