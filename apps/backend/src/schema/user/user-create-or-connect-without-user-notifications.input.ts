import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutUserNotificationsInput } from './user-create-without-user-notifications.input';

@InputType()
export class UserCreateOrConnectWithoutUserNotificationsInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutUserNotificationsInput, {nullable:false})
    @Type(() => UserCreateWithoutUserNotificationsInput)
    create!: UserCreateWithoutUserNotificationsInput;
}
