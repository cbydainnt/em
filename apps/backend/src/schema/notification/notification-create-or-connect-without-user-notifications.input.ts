import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { NotificationWhereUniqueInput } from './notification-where-unique.input';
import { Type } from 'class-transformer';
import { NotificationCreateWithoutUserNotificationsInput } from './notification-create-without-user-notifications.input';

@InputType()
export class NotificationCreateOrConnectWithoutUserNotificationsInput {

    @Field(() => NotificationWhereUniqueInput, {nullable:false})
    @Type(() => NotificationWhereUniqueInput)
    where!: Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>;

    @Field(() => NotificationCreateWithoutUserNotificationsInput, {nullable:false})
    @Type(() => NotificationCreateWithoutUserNotificationsInput)
    create!: NotificationCreateWithoutUserNotificationsInput;
}
