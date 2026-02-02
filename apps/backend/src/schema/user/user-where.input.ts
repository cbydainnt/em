import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolNullableFilter } from '../prisma/bool-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { UserNullableRelationFilter } from './user-nullable-relation-filter.input';
import { UserListRelationFilter } from './user-list-relation-filter.input';
import { NotificationListRelationFilter } from '../notification/notification-list-relation-filter.input';
import { UserNotificationListRelationFilter } from '../user-notification/user-notification-list-relation-filter.input';
import { UserCourseListRelationFilter } from '../user-course/user-course-list-relation-filter.input';
import { CommentListRelationFilter } from '../comment/comment-list-relation-filter.input';
import { CourseReviewListRelationFilter } from '../course-review/course-review-list-relation-filter.input';
import { OrderListRelationFilter } from '../order/order-list-relation-filter.input';
import { DiscountVoucherUsageListRelationFilter } from '../discount-voucher-usage/discount-voucher-usage-list-relation-filter.input';
import { CartItemListRelationFilter } from '../cart-item/cart-item-list-relation-filter.input';
import { UserLessonProgressListRelationFilter } from '../user-lesson-progress/user-lesson-progress-list-relation-filter.input';
import { NoteListRelationFilter } from '../note/note-list-relation-filter.input';
import { ReportListRelationFilter } from '../report/report-list-relation-filter.input';
import { ReportCommentListRelationFilter } from '../report-comment/report-comment-list-relation-filter.input';
import { UserQuizProgressListRelationFilter } from '../user-quiz-progress/user-quiz-progress-list-relation-filter.input';
import { DiscountVoucherUserListRelationFilter } from '../discount-voucher-user/discount-voucher-user-list-relation-filter.input';
import { CourseViewListRelationFilter } from '../course-view/course-view-list-relation-filter.input';

@InputType()
export class UserWhereInput {

    @Field(() => [UserWhereInput], {nullable:true})
    AND?: Array<UserWhereInput>;

    @Field(() => [UserWhereInput], {nullable:true})
    OR?: Array<UserWhereInput>;

    @Field(() => [UserWhereInput], {nullable:true})
    NOT?: Array<UserWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    type?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    name?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    email?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    phone?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    address?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    avatar?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    googleId?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    password?: StringNullableFilter;

    @Field(() => BoolNullableFilter, {nullable:true})
    deleted?: BoolNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    deleted_at?: DateTimeNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    created_by_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    updated_by_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    deleted_by_id?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    verified?: BoolFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    verifyToken?: StringNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    verifyExpires?: DateTimeNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    passwordResetToken?: StringNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    passwordResetExpires?: DateTimeNullableFilter;

    @Field(() => UserNullableRelationFilter, {nullable:true})
    created_by?: UserNullableRelationFilter;

    @Field(() => UserListRelationFilter, {nullable:true})
    createds?: UserListRelationFilter;

    @Field(() => UserNullableRelationFilter, {nullable:true})
    updated_by?: UserNullableRelationFilter;

    @Field(() => UserListRelationFilter, {nullable:true})
    updateds?: UserListRelationFilter;

    @Field(() => UserNullableRelationFilter, {nullable:true})
    deleted_by?: UserNullableRelationFilter;

    @Field(() => UserListRelationFilter, {nullable:true})
    deleteds?: UserListRelationFilter;

    @Field(() => NotificationListRelationFilter, {nullable:true})
    notifications?: NotificationListRelationFilter;

    @Field(() => UserNotificationListRelationFilter, {nullable:true})
    userNotifications?: UserNotificationListRelationFilter;

    @Field(() => UserCourseListRelationFilter, {nullable:true})
    user_courses?: UserCourseListRelationFilter;

    @Field(() => CommentListRelationFilter, {nullable:true})
    comments?: CommentListRelationFilter;

    @Field(() => CourseReviewListRelationFilter, {nullable:true})
    courseReviews?: CourseReviewListRelationFilter;

    @Field(() => OrderListRelationFilter, {nullable:true})
    orders?: OrderListRelationFilter;

    @Field(() => DiscountVoucherUsageListRelationFilter, {nullable:true})
    discount_vouchers?: DiscountVoucherUsageListRelationFilter;

    @Field(() => CartItemListRelationFilter, {nullable:true})
    cartItems?: CartItemListRelationFilter;

    @Field(() => UserLessonProgressListRelationFilter, {nullable:true})
    user_lesson_progress?: UserLessonProgressListRelationFilter;

    @Field(() => NoteListRelationFilter, {nullable:true})
    notes?: NoteListRelationFilter;

    @Field(() => ReportListRelationFilter, {nullable:true})
    reports?: ReportListRelationFilter;

    @Field(() => ReportCommentListRelationFilter, {nullable:true})
    reportComments?: ReportCommentListRelationFilter;

    @Field(() => ReportListRelationFilter, {nullable:true})
    resolved_reports?: ReportListRelationFilter;

    @Field(() => UserQuizProgressListRelationFilter, {nullable:true})
    quiz_progress?: UserQuizProgressListRelationFilter;

    @Field(() => DiscountVoucherUserListRelationFilter, {nullable:true})
    allowed_discount_vouchers?: DiscountVoucherUserListRelationFilter;

    @Field(() => CourseViewListRelationFilter, {nullable:true})
    course_view?: CourseViewListRelationFilter;
}
