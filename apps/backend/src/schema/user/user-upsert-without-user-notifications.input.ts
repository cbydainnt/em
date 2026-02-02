import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutUserNotificationsInput } from './user-update-without-user-notifications.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutUserNotificationsInput } from './user-create-without-user-notifications.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutUserNotificationsInput {

    @Field(() => UserUpdateWithoutUserNotificationsInput, {nullable:false})
    @Type(() => UserUpdateWithoutUserNotificationsInput)
    update!: UserUpdateWithoutUserNotificationsInput;

    @Field(() => UserCreateWithoutUserNotificationsInput, {nullable:false})
    @Type(() => UserCreateWithoutUserNotificationsInput)
    create!: UserCreateWithoutUserNotificationsInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
