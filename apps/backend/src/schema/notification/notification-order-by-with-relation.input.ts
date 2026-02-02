import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { CourseOrderByWithRelationInput } from '../course/course-order-by-with-relation.input';
import { LessonOrderByWithRelationInput } from '../lesson/lesson-order-by-with-relation.input';
import { UserNotificationOrderByRelationAggregateInput } from '../user-notification/user-notification-order-by-relation-aggregate.input';

@InputType()
export class NotificationOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    notification_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    message?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    context?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    action_url?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: UserOrderByWithRelationInput;

    @Field(() => CourseOrderByWithRelationInput, {nullable:true})
    course?: CourseOrderByWithRelationInput;

    @Field(() => LessonOrderByWithRelationInput, {nullable:true})
    lesson?: LessonOrderByWithRelationInput;

    @Field(() => UserNotificationOrderByRelationAggregateInput, {nullable:true})
    userNotifications?: UserNotificationOrderByRelationAggregateInput;
}
