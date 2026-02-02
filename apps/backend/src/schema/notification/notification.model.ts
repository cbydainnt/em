import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Course } from '../course/course.model';
import { Lesson } from '../lesson/lesson.model';
import { UserNotification } from '../user-notification/user-notification.model';
import { NotificationCount } from './notification-count.output';

@ObjectType()
export class Notification {

    @Field(() => ID, {nullable:false})
    notification_id!: string;

    @Field(() => String, {nullable:true})
    user_id!: string | null;

    @Field(() => String, {nullable:true})
    user_type!: string | null;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => String, {nullable:false})
    message!: string;

    @Field(() => Int, {nullable:false})
    type!: number;

    @Field(() => String, {nullable:true})
    context!: string | null;

    @Field(() => String, {nullable:true})
    action_url!: string | null;

    @Field(() => Int, {nullable:false,defaultValue:1})
    status!: number;

    @Field(() => String, {nullable:true})
    course_id!: string | null;

    @Field(() => String, {nullable:true})
    lesson_id!: string | null;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:true})
    updated_at!: Date | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => User, {nullable:true})
    user?: User | null;

    @Field(() => Course, {nullable:true})
    course?: Course | null;

    @Field(() => Lesson, {nullable:true})
    lesson?: Lesson | null;

    @Field(() => [UserNotification], {nullable:true})
    userNotifications?: Array<UserNotification>;

    @Field(() => NotificationCount, {nullable:false})
    _count?: NotificationCount;
}
