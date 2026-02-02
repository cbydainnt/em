import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserNotificationUpdateManyMutationInput } from './user-notification-update-many-mutation.input';
import { Type } from 'class-transformer';
import { UserNotificationWhereInput } from './user-notification-where.input';

@ArgsType()
export class UpdateManyUserNotificationArgs {

    @Field(() => UserNotificationUpdateManyMutationInput, {nullable:false})
    @Type(() => UserNotificationUpdateManyMutationInput)
    data!: UserNotificationUpdateManyMutationInput;

    @Field(() => UserNotificationWhereInput, {nullable:true})
    @Type(() => UserNotificationWhereInput)
    where?: UserNotificationWhereInput;
}
