import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutNotificationsInput } from './user-create-without-notifications.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutNotificationsInput } from './user-create-or-connect-without-notifications.input';
import { UserUpsertWithoutNotificationsInput } from './user-upsert-without-notifications.input';
import { UserWhereInput } from './user-where.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutNotificationsInput } from './user-update-to-one-with-where-without-notifications.input';

@InputType()
export class UserUpdateOneWithoutNotificationsNestedInput {

    @Field(() => UserCreateWithoutNotificationsInput, {nullable:true})
    @Type(() => UserCreateWithoutNotificationsInput)
    create?: UserCreateWithoutNotificationsInput;

    @Field(() => UserCreateOrConnectWithoutNotificationsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutNotificationsInput)
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput;

    @Field(() => UserUpsertWithoutNotificationsInput, {nullable:true})
    @Type(() => UserUpsertWithoutNotificationsInput)
    upsert?: UserUpsertWithoutNotificationsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    delete?: UserWhereInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutNotificationsInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutNotificationsInput)
    update?: UserUpdateToOneWithWhereWithoutNotificationsInput;
}
