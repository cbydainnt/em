import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserLessonProgressSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    watched_seconds?: true;

    @Field(() => Boolean, {nullable:true})
    completed?: true;
}
