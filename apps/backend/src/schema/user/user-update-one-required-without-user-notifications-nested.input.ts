import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUserNotificationsInput } from './user-create-without-user-notifications.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutUserNotificationsInput } from './user-create-or-connect-without-user-notifications.input';
import { UserUpsertWithoutUserNotificationsInput } from './user-upsert-without-user-notifications.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutUserNotificationsInput } from './user-update-to-one-with-where-without-user-notifications.input';

@InputType()
export class UserUpdateOneRequiredWithoutUserNotificationsNestedInput {

    @Field(() => UserCreateWithoutUserNotificationsInput, {nullable:true})
    @Type(() => UserCreateWithoutUserNotificationsInput)
    create?: UserCreateWithoutUserNotificationsInput;

    @Field(() => UserCreateOrConnectWithoutUserNotificationsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUserNotificationsInput)
    connectOrCreate?: UserCreateOrConnectWithoutUserNotificationsInput;

    @Field(() => UserUpsertWithoutUserNotificationsInput, {nullable:true})
    @Type(() => UserUpsertWithoutUserNotificationsInput)
    upsert?: UserUpsertWithoutUserNotificationsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutUserNotificationsInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutUserNotificationsInput)
    update?: UserUpdateToOneWithWhereWithoutUserNotificationsInput;
}
