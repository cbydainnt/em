import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserNotificationCreateWithoutNotificationInput } from './user-notification-create-without-notification.input';
import { Type } from 'class-transformer';
import { UserNotificationCreateOrConnectWithoutNotificationInput } from './user-notification-create-or-connect-without-notification.input';
import { UserNotificationCreateManyNotificationInputEnvelope } from './user-notification-create-many-notification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserNotificationWhereUniqueInput } from './user-notification-where-unique.input';

@InputType()
export class UserNotificationCreateNestedManyWithoutNotificationInput {

    @Field(() => [UserNotificationCreateWithoutNotificationInput], {nullable:true})
    @Type(() => UserNotificationCreateWithoutNotificationInput)
    create?: Array<UserNotificationCreateWithoutNotificationInput>;

    @Field(() => [UserNotificationCreateOrConnectWithoutNotificationInput], {nullable:true})
    @Type(() => UserNotificationCreateOrConnectWithoutNotificationInput)
    connectOrCreate?: Array<UserNotificationCreateOrConnectWithoutNotificationInput>;

    @Field(() => UserNotificationCreateManyNotificationInputEnvelope, {nullable:true})
    @Type(() => UserNotificationCreateManyNotificationInputEnvelope)
    createMany?: UserNotificationCreateManyNotificationInputEnvelope;

    @Field(() => [UserNotificationWhereUniqueInput], {nullable:true})
    @Type(() => UserNotificationWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserNotificationWhereUniqueInput, 'id' | 'user_id_notification_id'>>;
}
