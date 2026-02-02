import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserNotificationCreateManyUserInput } from './user-notification-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class UserNotificationCreateManyUserInputEnvelope {

    @Field(() => [UserNotificationCreateManyUserInput], {nullable:false})
    @Type(() => UserNotificationCreateManyUserInput)
    data!: Array<UserNotificationCreateManyUserInput>;
}
