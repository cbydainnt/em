import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserNotificationAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    status?: true;
}
