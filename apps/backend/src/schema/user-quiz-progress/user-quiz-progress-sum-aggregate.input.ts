import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserQuizProgressSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    score?: true;

    @Field(() => Boolean, {nullable:true})
    percentage?: true;

    @Field(() => Boolean, {nullable:true})
    total_questions?: true;

    @Field(() => Boolean, {nullable:true})
    correct_answers?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;

    @Field(() => Boolean, {nullable:true})
    time_spent?: true;

    @Field(() => Boolean, {nullable:true})
    attempts?: true;
}
