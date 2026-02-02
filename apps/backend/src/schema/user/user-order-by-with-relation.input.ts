import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserOrderByRelationAggregateInput } from './user-order-by-relation-aggregate.input';
import { NotificationOrderByRelationAggregateInput } from '../notification/notification-order-by-relation-aggregate.input';
import { UserNotificationOrderByRelationAggregateInput } from '../user-notification/user-notification-order-by-relation-aggregate.input';
import { UserCourseOrderByRelationAggregateInput } from '../user-course/user-course-order-by-relation-aggregate.input';
import { CommentOrderByRelationAggregateInput } from '../comment/comment-order-by-relation-aggregate.input';
import { CourseReviewOrderByRelationAggregateInput } from '../course-review/course-review-order-by-relation-aggregate.input';
import { OrderOrderByRelationAggregateInput } from '../order/order-order-by-relation-aggregate.input';
import { DiscountVoucherUsageOrderByRelationAggregateInput } from '../discount-voucher-usage/discount-voucher-usage-order-by-relation-aggregate.input';
import { CartItemOrderByRelationAggregateInput } from '../cart-item/cart-item-order-by-relation-aggregate.input';
import { UserLessonProgressOrderByRelationAggregateInput } from '../user-lesson-progress/user-lesson-progress-order-by-relation-aggregate.input';
import { NoteOrderByRelationAggregateInput } from '../note/note-order-by-relation-aggregate.input';
import { ReportOrderByRelationAggregateInput } from '../report/report-order-by-relation-aggregate.input';
import { ReportCommentOrderByRelationAggregateInput } from '../report-comment/report-comment-order-by-relation-aggregate.input';
import { UserQuizProgressOrderByRelationAggregateInput } from '../user-quiz-progress/user-quiz-progress-order-by-relation-aggregate.input';
import { DiscountVoucherUserOrderByRelationAggregateInput } from '../discount-voucher-user/discount-voucher-user-order-by-relation-aggregate.input';
import { CourseViewOrderByRelationAggregateInput } from '../course-view/course-view-order-by-relation-aggregate.input';

@InputType()
export class UserOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    email?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    phone?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    address?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    avatar?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    googleId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    password?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    deleted?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    deleted_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_by_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_by_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    deleted_by_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    verified?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    verifyToken?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    verifyExpires?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    passwordResetToken?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    passwordResetExpires?: keyof typeof SortOrder;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    created_by?: UserOrderByWithRelationInput;

    @Field(() => UserOrderByRelationAggregateInput, {nullable:true})
    createds?: UserOrderByRelationAggregateInput;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    updated_by?: UserOrderByWithRelationInput;

    @Field(() => UserOrderByRelationAggregateInput, {nullable:true})
    updateds?: UserOrderByRelationAggregateInput;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    deleted_by?: UserOrderByWithRelationInput;

    @Field(() => UserOrderByRelationAggregateInput, {nullable:true})
    deleteds?: UserOrderByRelationAggregateInput;

    @Field(() => NotificationOrderByRelationAggregateInput, {nullable:true})
    notifications?: NotificationOrderByRelationAggregateInput;

    @Field(() => UserNotificationOrderByRelationAggregateInput, {nullable:true})
    userNotifications?: UserNotificationOrderByRelationAggregateInput;

    @Field(() => UserCourseOrderByRelationAggregateInput, {nullable:true})
    user_courses?: UserCourseOrderByRelationAggregateInput;

    @Field(() => CommentOrderByRelationAggregateInput, {nullable:true})
    comments?: CommentOrderByRelationAggregateInput;

    @Field(() => CourseReviewOrderByRelationAggregateInput, {nullable:true})
    courseReviews?: CourseReviewOrderByRelationAggregateInput;

    @Field(() => OrderOrderByRelationAggregateInput, {nullable:true})
    orders?: OrderOrderByRelationAggregateInput;

    @Field(() => DiscountVoucherUsageOrderByRelationAggregateInput, {nullable:true})
    discount_vouchers?: DiscountVoucherUsageOrderByRelationAggregateInput;

    @Field(() => CartItemOrderByRelationAggregateInput, {nullable:true})
    cartItems?: CartItemOrderByRelationAggregateInput;

    @Field(() => UserLessonProgressOrderByRelationAggregateInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressOrderByRelationAggregateInput;

    @Field(() => NoteOrderByRelationAggregateInput, {nullable:true})
    notes?: NoteOrderByRelationAggregateInput;

    @Field(() => ReportOrderByRelationAggregateInput, {nullable:true})
    reports?: ReportOrderByRelationAggregateInput;

    @Field(() => ReportCommentOrderByRelationAggregateInput, {nullable:true})
    reportComments?: ReportCommentOrderByRelationAggregateInput;

    @Field(() => ReportOrderByRelationAggregateInput, {nullable:true})
    resolved_reports?: ReportOrderByRelationAggregateInput;

    @Field(() => UserQuizProgressOrderByRelationAggregateInput, {nullable:true})
    quiz_progress?: UserQuizProgressOrderByRelationAggregateInput;

    @Field(() => DiscountVoucherUserOrderByRelationAggregateInput, {nullable:true})
    allowed_discount_vouchers?: DiscountVoucherUserOrderByRelationAggregateInput;

    @Field(() => CourseViewOrderByRelationAggregateInput, {nullable:true})
    course_view?: CourseViewOrderByRelationAggregateInput;
}
