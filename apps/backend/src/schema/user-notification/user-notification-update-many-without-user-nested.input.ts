import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserNotificationCreateWithoutUserInput } from './user-notification-create-without-user.input';
import { Type } from 'class-transformer';
import { UserNotificationCreateOrConnectWithoutUserInput } from './user-notification-create-or-connect-without-user.input';
import { UserNotificationUpsertWithWhereUniqueWithoutUserInput } from './user-notification-upsert-with-where-unique-without-user.input';
import { UserNotificationCreateManyUserInputEnvelope } from './user-notification-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserNotificationWhereUniqueInput } from './user-notification-where-unique.input';
import { UserNotificationUpdateWithWhereUniqueWithoutUserInput } from './user-notification-update-with-where-unique-without-user.input';
import { UserNotificationUpdateManyWithWhereWithoutUserInput } from './user-notification-update-many-with-where-without-user.input';
import { UserNotificationScalarWhereInput } from './user-notification-scalar-where.input';

@InputType()
export class UserNotificationUpdateManyWithoutUserNestedInput {

    @Field(() => [UserNotificationCreateWithoutUserInput], {nullable:true})
    @Type(() => UserNotificationCreateWithoutUserInput)
    create?: Array<UserNotificationCreateWithoutUserInput>;

    @Field(() => [UserNotificationCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserNotificationCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserNotificationCreateOrConnectWithoutUserInput>;

    @Field(() => [UserNotificationUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserNotificationUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<UserNotificationUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => UserNotificationCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserNotificationCreateManyUserInputEnvelope)
    createMany?: UserNotificationCreateManyUserInputEnvelope;

    @Field(() => [UserNotificationWhereUniqueInput], {nullable:true})
    @Type(() => UserNotificationWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserNotificationWhereUniqueInput, 'id' | 'user_id_notification_id'>>;

    @Field(() => [UserNotificationWhereUniqueInput], {nullable:true})
    @Type(() => UserNotificationWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserNotificationWhereUniqueInput, 'id' | 'user_id_notification_id'>>;

    @Field(() => [UserNotificationWhereUniqueInput], {nullable:true})
    @Type(() => UserNotificationWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserNotificationWhereUniqueInput, 'id' | 'user_id_notification_id'>>;

    @Field(() => [UserNotificationWhereUniqueInput], {nullable:true})
    @Type(() => UserNotificationWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserNotificationWhereUniqueInput, 'id' | 'user_id_notification_id'>>;

    @Field(() => [UserNotificationUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserNotificationUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<UserNotificationUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [UserNotificationUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => UserNotificationUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<UserNotificationUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [UserNotificationScalarWhereInput], {nullable:true})
    @Type(() => UserNotificationScalarWhereInput)
    deleteMany?: Array<UserNotificationScalarWhereInput>;
}
