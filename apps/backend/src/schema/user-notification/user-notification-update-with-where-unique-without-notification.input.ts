import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserNotificationWhereUniqueInput } from './user-notification-where-unique.input';
import { Type } from 'class-transformer';
import { UserNotificationUpdateWithoutNotificationInput } from './user-notification-update-without-notification.input';

@InputType()
export class UserNotificationUpdateWithWhereUniqueWithoutNotificationInput {

    @Field(() => UserNotificationWhereUniqueInput, {nullable:false})
    @Type(() => UserNotificationWhereUniqueInput)
    where!: Prisma.AtLeast<UserNotificationWhereUniqueInput, 'id' | 'user_id_notification_id'>;

    @Field(() => UserNotificationUpdateWithoutNotificationInput, {nullable:false})
    @Type(() => UserNotificationUpdateWithoutNotificationInput)
    data!: UserNotificationUpdateWithoutNotificationInput;
}
