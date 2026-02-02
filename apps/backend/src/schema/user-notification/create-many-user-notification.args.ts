import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserNotificationCreateManyInput } from './user-notification-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyUserNotificationArgs {

    @Field(() => [UserNotificationCreateManyInput], {nullable:false})
    @Type(() => UserNotificationCreateManyInput)
    data!: Array<UserNotificationCreateManyInput>;
}
