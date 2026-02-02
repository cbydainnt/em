import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutUserNotificationsInput } from '../user/user-create-nested-one-without-user-notifications.input';
import { NotificationCreateNestedOneWithoutUserNotificationsInput } from '../notification/notification-create-nested-one-without-user-notifications.input';

@InputType()
export class UserNotificationCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Date, {nullable:true})
    read_at?: Date | string;

    @Field(() => UserCreateNestedOneWithoutUserNotificationsInput, {nullable:false})
    user!: UserCreateNestedOneWithoutUserNotificationsInput;

    @Field(() => NotificationCreateNestedOneWithoutUserNotificationsInput, {nullable:false})
    notification!: NotificationCreateNestedOneWithoutUserNotificationsInput;
}
