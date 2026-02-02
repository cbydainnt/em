import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NotificationWhereInput } from './notification-where.input';
import { Type } from 'class-transformer';
import { NotificationUpdateWithoutUserNotificationsInput } from './notification-update-without-user-notifications.input';

@InputType()
export class NotificationUpdateToOneWithWhereWithoutUserNotificationsInput {

    @Field(() => NotificationWhereInput, {nullable:true})
    @Type(() => NotificationWhereInput)
    where?: NotificationWhereInput;

    @Field(() => NotificationUpdateWithoutUserNotificationsInput, {nullable:false})
    @Type(() => NotificationUpdateWithoutUserNotificationsInput)
    data!: NotificationUpdateWithoutUserNotificationsInput;
}
