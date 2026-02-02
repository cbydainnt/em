import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NotificationCreateWithoutUserNotificationsInput } from './notification-create-without-user-notifications.input';
import { Type } from 'class-transformer';
import { NotificationCreateOrConnectWithoutUserNotificationsInput } from './notification-create-or-connect-without-user-notifications.input';
import { Prisma } from '@prisma/client';
import { NotificationWhereUniqueInput } from './notification-where-unique.input';

@InputType()
export class NotificationCreateNestedOneWithoutUserNotificationsInput {

    @Field(() => NotificationCreateWithoutUserNotificationsInput, {nullable:true})
    @Type(() => NotificationCreateWithoutUserNotificationsInput)
    create?: NotificationCreateWithoutUserNotificationsInput;

    @Field(() => NotificationCreateOrConnectWithoutUserNotificationsInput, {nullable:true})
    @Type(() => NotificationCreateOrConnectWithoutUserNotificationsInput)
    connectOrCreate?: NotificationCreateOrConnectWithoutUserNotificationsInput;

    @Field(() => NotificationWhereUniqueInput, {nullable:true})
    @Type(() => NotificationWhereUniqueInput)
    connect?: Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>;
}
