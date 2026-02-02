import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserNotificationWhereUniqueInput } from './user-notification-where-unique.input';
import { Type } from 'class-transformer';
import { UserNotificationCreateWithoutUserInput } from './user-notification-create-without-user.input';

@InputType()
export class UserNotificationCreateOrConnectWithoutUserInput {

    @Field(() => UserNotificationWhereUniqueInput, {nullable:false})
    @Type(() => UserNotificationWhereUniqueInput)
    where!: Prisma.AtLeast<UserNotificationWhereUniqueInput, 'id' | 'user_id_notification_id'>;

    @Field(() => UserNotificationCreateWithoutUserInput, {nullable:false})
    @Type(() => UserNotificationCreateWithoutUserInput)
    create!: UserNotificationCreateWithoutUserInput;
}
