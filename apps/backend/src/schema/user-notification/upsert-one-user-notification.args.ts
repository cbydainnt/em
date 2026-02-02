import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserNotificationWhereUniqueInput } from './user-notification-where-unique.input';
import { Type } from 'class-transformer';
import { UserNotificationCreateInput } from './user-notification-create.input';
import { UserNotificationUpdateInput } from './user-notification-update.input';

@ArgsType()
export class UpsertOneUserNotificationArgs {

    @Field(() => UserNotificationWhereUniqueInput, {nullable:false})
    @Type(() => UserNotificationWhereUniqueInput)
    where!: Prisma.AtLeast<UserNotificationWhereUniqueInput, 'id' | 'user_id_notification_id'>;

    @Field(() => UserNotificationCreateInput, {nullable:false})
    @Type(() => UserNotificationCreateInput)
    create!: UserNotificationCreateInput;

    @Field(() => UserNotificationUpdateInput, {nullable:false})
    @Type(() => UserNotificationUpdateInput)
    update!: UserNotificationUpdateInput;
}
