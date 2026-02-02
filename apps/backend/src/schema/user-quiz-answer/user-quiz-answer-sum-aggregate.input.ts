import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserQuizAnswerSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    points_earned?: true;

    @Field(() => Boolean, {nullable:true})
    time_spent?: true;
}
