import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserNotificationUpdateInput } from './user-notification-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { UserNotificationWhereUniqueInput } from './user-notification-where-unique.input';

@ArgsType()
export class UpdateOneUserNotificationArgs {

    @Field(() => UserNotificationUpdateInput, {nullable:false})
    @Type(() => UserNotificationUpdateInput)
    data!: UserNotificationUpdateInput;

    @Field(() => UserNotificationWhereUniqueInput, {nullable:false})
    @Type(() => UserNotificationWhereUniqueInput)
    where!: Prisma.AtLeast<UserNotificationWhereUniqueInput, 'id' | 'user_id_notification_id'>;
}
