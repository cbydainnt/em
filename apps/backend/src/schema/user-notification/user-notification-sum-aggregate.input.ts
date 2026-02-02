import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserNotificationSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    status?: true;
}
