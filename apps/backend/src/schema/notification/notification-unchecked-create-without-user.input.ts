import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserNotificationUncheckedCreateNestedManyWithoutNotificationInput } from '../user-notification/user-notification-unchecked-create-nested-many-without-notification.input';

@InputType()
export class NotificationUncheckedCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    notification_id?: string;

    @Field(() => String, {nullable:true})
    user_type?: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => String, {nullable:false})
    message!: string;

    @Field(() => Int, {nullable:false})
    type!: number;

    @Field(() => String, {nullable:true})
    context?: string;

    @Field(() => String, {nullable:true})
    action_url?: string;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:true})
    lesson_id?: string;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => UserNotificationUncheckedCreateNestedManyWithoutNotificationInput, {nullable:true})
    userNotifications?: UserNotificationUncheckedCreateNestedManyWithoutNotificationInput;
}
