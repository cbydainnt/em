import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NotificationUpdateWithoutUserNotificationsInput } from './notification-update-without-user-notifications.input';
import { Type } from 'class-transformer';
import { NotificationCreateWithoutUserNotificationsInput } from './notification-create-without-user-notifications.input';
import { NotificationWhereInput } from './notification-where.input';

@InputType()
export class NotificationUpsertWithoutUserNotificationsInput {

    @Field(() => NotificationUpdateWithoutUserNotificationsInput, {nullable:false})
    @Type(() => NotificationUpdateWithoutUserNotificationsInput)
    update!: NotificationUpdateWithoutUserNotificationsInput;

    @Field(() => NotificationCreateWithoutUserNotificationsInput, {nullable:false})
    @Type(() => NotificationCreateWithoutUserNotificationsInput)
    create!: NotificationCreateWithoutUserNotificationsInput;

    @Field(() => NotificationWhereInput, {nullable:true})
    @Type(() => NotificationWhereInput)
    where?: NotificationWhereInput;
}
