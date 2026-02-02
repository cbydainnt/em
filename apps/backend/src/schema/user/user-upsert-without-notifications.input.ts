import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutNotificationsInput } from './user-update-without-notifications.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutNotificationsInput } from './user-create-without-notifications.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutNotificationsInput {

    @Field(() => UserUpdateWithoutNotificationsInput, {nullable:false})
    @Type(() => UserUpdateWithoutNotificationsInput)
    update!: UserUpdateWithoutNotificationsInput;

    @Field(() => UserCreateWithoutNotificationsInput, {nullable:false})
    @Type(() => UserCreateWithoutNotificationsInput)
    create!: UserCreateWithoutNotificationsInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
