import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutUserNotificationsInput } from '../user/user-create-nested-one-without-user-notifications.input';

@InputType()
export class UserNotificationCreateWithoutNotificationInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Date, {nullable:true})
    read_at?: Date | string;

    @Field(() => UserCreateNestedOneWithoutUserNotificationsInput, {nullable:false})
    user!: UserCreateNestedOneWithoutUserNotificationsInput;
}
