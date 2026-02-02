import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { NotificationCreateNestedOneWithoutUserNotificationsInput } from '../notification/notification-create-nested-one-without-user-notifications.input';

@InputType()
export class UserNotificationCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Date, {nullable:true})
    read_at?: Date | string;

    @Field(() => NotificationCreateNestedOneWithoutUserNotificationsInput, {nullable:false})
    notification!: NotificationCreateNestedOneWithoutUserNotificationsInput;
}
