import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NotificationCreateWithoutUserNotificationsInput } from './notification-create-without-user-notifications.input';
import { Type } from 'class-transformer';
import { NotificationCreateOrConnectWithoutUserNotificationsInput } from './notification-create-or-connect-without-user-notifications.input';
import { NotificationUpsertWithoutUserNotificationsInput } from './notification-upsert-without-user-notifications.input';
import { Prisma } from '@prisma/client';
import { NotificationWhereUniqueInput } from './notification-where-unique.input';
import { NotificationUpdateToOneWithWhereWithoutUserNotificationsInput } from './notification-update-to-one-with-where-without-user-notifications.input';

@InputType()
export class NotificationUpdateOneRequiredWithoutUserNotificationsNestedInput {

    @Field(() => NotificationCreateWithoutUserNotificationsInput, {nullable:true})
    @Type(() => NotificationCreateWithoutUserNotificationsInput)
    create?: NotificationCreateWithoutUserNotificationsInput;

    @Field(() => NotificationCreateOrConnectWithoutUserNotificationsInput, {nullable:true})
    @Type(() => NotificationCreateOrConnectWithoutUserNotificationsInput)
    connectOrCreate?: NotificationCreateOrConnectWithoutUserNotificationsInput;

    @Field(() => NotificationUpsertWithoutUserNotificationsInput, {nullable:true})
    @Type(() => NotificationUpsertWithoutUserNotificationsInput)
    upsert?: NotificationUpsertWithoutUserNotificationsInput;

    @Field(() => NotificationWhereUniqueInput, {nullable:true})
    @Type(() => NotificationWhereUniqueInput)
    connect?: Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>;

    @Field(() => NotificationUpdateToOneWithWhereWithoutUserNotificationsInput, {nullable:true})
    @Type(() => NotificationUpdateToOneWithWhereWithoutUserNotificationsInput)
    update?: NotificationUpdateToOneWithWhereWithoutUserNotificationsInput;
}
