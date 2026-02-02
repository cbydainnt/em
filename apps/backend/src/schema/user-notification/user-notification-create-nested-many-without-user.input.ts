import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserNotificationCreateWithoutUserInput } from './user-notification-create-without-user.input';
import { Type } from 'class-transformer';
import { UserNotificationCreateOrConnectWithoutUserInput } from './user-notification-create-or-connect-without-user.input';
import { UserNotificationCreateManyUserInputEnvelope } from './user-notification-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserNotificationWhereUniqueInput } from './user-notification-where-unique.input';

@InputType()
export class UserNotificationCreateNestedManyWithoutUserInput {

    @Field(() => [UserNotificationCreateWithoutUserInput], {nullable:true})
    @Type(() => UserNotificationCreateWithoutUserInput)
    create?: Array<UserNotificationCreateWithoutUserInput>;

    @Field(() => [UserNotificationCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserNotificationCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserNotificationCreateOrConnectWithoutUserInput>;

    @Field(() => UserNotificationCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserNotificationCreateManyUserInputEnvelope)
    createMany?: UserNotificationCreateManyUserInputEnvelope;

    @Field(() => [UserNotificationWhereUniqueInput], {nullable:true})
    @Type(() => UserNotificationWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserNotificationWhereUniqueInput, 'id' | 'user_id_notification_id'>>;
}
