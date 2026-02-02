import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NotificationWhereInput } from './notification-where.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { UserNullableRelationFilter } from '../user/user-nullable-relation-filter.input';
import { CourseNullableRelationFilter } from '../course/course-nullable-relation-filter.input';
import { LessonNullableRelationFilter } from '../lesson/lesson-nullable-relation-filter.input';
import { UserNotificationListRelationFilter } from '../user-notification/user-notification-list-relation-filter.input';

@InputType()
export class NotificationWhereUniqueInput {

    @Field(() => String, {nullable:true})
    notification_id?: string;

    @Field(() => [NotificationWhereInput], {nullable:true})
    AND?: Array<NotificationWhereInput>;

    @Field(() => [NotificationWhereInput], {nullable:true})
    OR?: Array<NotificationWhereInput>;

    @Field(() => [NotificationWhereInput], {nullable:true})
    NOT?: Array<NotificationWhereInput>;

    @Field(() => StringNullableFilter, {nullable:true})
    user_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    user_type?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    title?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    message?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    type?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    context?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    action_url?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    status?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    course_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    lesson_id?: StringNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    updated_at?: DateTimeNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    del_flg?: BoolFilter;

    @Field(() => UserNullableRelationFilter, {nullable:true})
    user?: UserNullableRelationFilter;

    @Field(() => CourseNullableRelationFilter, {nullable:true})
    course?: CourseNullableRelationFilter;

    @Field(() => LessonNullableRelationFilter, {nullable:true})
    lesson?: LessonNullableRelationFilter;

    @Field(() => UserNotificationListRelationFilter, {nullable:true})
    userNotifications?: UserNotificationListRelationFilter;
}
