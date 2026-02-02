import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { UserUpdateOneWithoutNotificationsNestedInput } from '../user/user-update-one-without-notifications-nested.input';
import { LessonUpdateOneWithoutNotificationsNestedInput } from '../lesson/lesson-update-one-without-notifications-nested.input';
import { UserNotificationUpdateManyWithoutNotificationNestedInput } from '../user-notification/user-notification-update-many-without-notification-nested.input';

@InputType()
export class NotificationUpdateWithoutCourseInput {

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    user_type?: NullableStringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    title?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    message?: StringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    type?: IntFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    context?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    action_url?: NullableStringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    status?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updated_at?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    del_flg?: BoolFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneWithoutNotificationsNestedInput, {nullable:true})
    user?: UserUpdateOneWithoutNotificationsNestedInput;

    @Field(() => LessonUpdateOneWithoutNotificationsNestedInput, {nullable:true})
    lesson?: LessonUpdateOneWithoutNotificationsNestedInput;

    @Field(() => UserNotificationUpdateManyWithoutNotificationNestedInput, {nullable:true})
    userNotifications?: UserNotificationUpdateManyWithoutNotificationNestedInput;
}
