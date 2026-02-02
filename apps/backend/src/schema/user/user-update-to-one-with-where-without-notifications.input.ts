import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutNotificationsInput } from './user-update-without-notifications.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutNotificationsInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutNotificationsInput, {nullable:false})
    @Type(() => UserUpdateWithoutNotificationsInput)
    data!: UserUpdateWithoutNotificationsInput;
}
