import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserNotificationWhereInput } from './user-notification-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyUserNotificationArgs {

    @Field(() => UserNotificationWhereInput, {nullable:true})
    @Type(() => UserNotificationWhereInput)
    where?: UserNotificationWhereInput;
}
