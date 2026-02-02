import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserNotificationWhereUniqueInput } from './user-notification-where-unique.input';
import { Type } from 'class-transformer';
import { UserNotificationCreateWithoutNotificationInput } from './user-notification-create-without-notification.input';

@InputType()
export class UserNotificationCreateOrConnectWithoutNotificationInput {

    @Field(() => UserNotificationWhereUniqueInput, {nullable:false})
    @Type(() => UserNotificationWhereUniqueInput)
    where!: Prisma.AtLeast<UserNotificationWhereUniqueInput, 'id' | 'user_id_notification_id'>;

    @Field(() => UserNotificationCreateWithoutNotificationInput, {nullable:false})
    @Type(() => UserNotificationCreateWithoutNotificationInput)
    create!: UserNotificationCreateWithoutNotificationInput;
}
