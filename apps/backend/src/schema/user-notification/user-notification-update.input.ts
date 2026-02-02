import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { UserUpdateOneRequiredWithoutUserNotificationsNestedInput } from '../user/user-update-one-required-without-user-notifications-nested.input';
import { NotificationUpdateOneRequiredWithoutUserNotificationsNestedInput } from '../notification/notification-update-one-required-without-user-notifications-nested.input';

@InputType()
export class UserNotificationUpdateInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    status?: IntFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    read_at?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneRequiredWithoutUserNotificationsNestedInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutUserNotificationsNestedInput;

    @Field(() => NotificationUpdateOneRequiredWithoutUserNotificationsNestedInput, {nullable:true})
    notification?: NotificationUpdateOneRequiredWithoutUserNotificationsNestedInput;
}
