import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserNotificationCreateInput } from './user-notification-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneUserNotificationArgs {

    @Field(() => UserNotificationCreateInput, {nullable:false})
    @Type(() => UserNotificationCreateInput)
    data!: UserNotificationCreateInput;
}
