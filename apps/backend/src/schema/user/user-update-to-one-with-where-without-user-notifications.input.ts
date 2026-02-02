import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutUserNotificationsInput } from './user-update-without-user-notifications.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutUserNotificationsInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutUserNotificationsInput, {nullable:false})
    @Type(() => UserUpdateWithoutUserNotificationsInput)
    data!: UserUpdateWithoutUserNotificationsInput;
}
