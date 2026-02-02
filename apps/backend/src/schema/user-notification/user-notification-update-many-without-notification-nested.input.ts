import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserNotificationCreateWithoutNotificationInput } from './user-notification-create-without-notification.input';
import { Type } from 'class-transformer';
import { UserNotificationCreateOrConnectWithoutNotificationInput } from './user-notification-create-or-connect-without-notification.input';
import { UserNotificationUpsertWithWhereUniqueWithoutNotificationInput } from './user-notification-upsert-with-where-unique-without-notification.input';
import { UserNotificationCreateManyNotificationInputEnvelope } from './user-notification-create-many-notification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserNotificationWhereUniqueInput } from './user-notification-where-unique.input';
import { UserNotificationUpdateWithWhereUniqueWithoutNotificationInput } from './user-notification-update-with-where-unique-without-notification.input';
import { UserNotificationUpdateManyWithWhereWithoutNotificationInput } from './user-notification-update-many-with-where-without-notification.input';
import { UserNotificationScalarWhereInput } from './user-notification-scalar-where.input';

@InputType()
export class UserNotificationUpdateManyWithoutNotificationNestedInput {

    @Field(() => [UserNotificationCreateWithoutNotificationInput], {nullable:true})
    @Type(() => UserNotificationCreateWithoutNotificationInput)
    create?: Array<UserNotificationCreateWithoutNotificationInput>;

    @Field(() => [UserNotificationCreateOrConnectWithoutNotificationInput], {nullable:true})
    @Type(() => UserNotificationCreateOrConnectWithoutNotificationInput)
    connectOrCreate?: Array<UserNotificationCreateOrConnectWithoutNotificationInput>;

    @Field(() => [UserNotificationUpsertWithWhereUniqueWithoutNotificationInput], {nullable:true})
    @Type(() => UserNotificationUpsertWithWhereUniqueWithoutNotificationInput)
    upsert?: Array<UserNotificationUpsertWithWhereUniqueWithoutNotificationInput>;

    @Field(() => UserNotificationCreateManyNotificationInputEnvelope, {nullable:true})
    @Type(() => UserNotificationCreateManyNotificationInputEnvelope)
    createMany?: UserNotificationCreateManyNotificationInputEnvelope;

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

    @Field(() => [UserNotificationUpdateWithWhereUniqueWithoutNotificationInput], {nullable:true})
    @Type(() => UserNotificationUpdateWithWhereUniqueWithoutNotificationInput)
    update?: Array<UserNotificationUpdateWithWhereUniqueWithoutNotificationInput>;

    @Field(() => [UserNotificationUpdateManyWithWhereWithoutNotificationInput], {nullable:true})
    @Type(() => UserNotificationUpdateManyWithWhereWithoutNotificationInput)
    updateMany?: Array<UserNotificationUpdateManyWithWhereWithoutNotificationInput>;

    @Field(() => [UserNotificationScalarWhereInput], {nullable:true})
    @Type(() => UserNotificationScalarWhereInput)
    deleteMany?: Array<UserNotificationScalarWhereInput>;
}
