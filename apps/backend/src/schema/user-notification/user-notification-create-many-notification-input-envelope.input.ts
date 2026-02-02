import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserNotificationCreateManyNotificationInput } from './user-notification-create-many-notification.input';
import { Type } from 'class-transformer';

@InputType()
export class UserNotificationCreateManyNotificationInputEnvelope {

    @Field(() => [UserNotificationCreateManyNotificationInput], {nullable:false})
    @Type(() => UserNotificationCreateManyNotificationInput)
    data!: Array<UserNotificationCreateManyNotificationInput>;
}
