import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUserNotificationsInput } from './user-create-without-user-notifications.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutUserNotificationsInput } from './user-create-or-connect-without-user-notifications.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutUserNotificationsInput {

    @Field(() => UserCreateWithoutUserNotificationsInput, {nullable:true})
    @Type(() => UserCreateWithoutUserNotificationsInput)
    create?: UserCreateWithoutUserNotificationsInput;

    @Field(() => UserCreateOrConnectWithoutUserNotificationsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUserNotificationsInput)
    connectOrCreate?: UserCreateOrConnectWithoutUserNotificationsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
