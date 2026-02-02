import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Notification } from '../notification/notification.model';
import { UserNotification } from '../user-notification/user-notification.model';
import { UserCourse } from '../user-course/user-course.model';
import { Comment } from '../comment/comment.model';
import { CourseReview } from '../course-review/course-review.model';
import { Order } from '../order/order.model';
import { DiscountVoucherUsage } from '../discount-voucher-usage/discount-voucher-usage.model';
import { CartItem } from '../cart-item/cart-item.model';
import { UserLessonProgress } from '../user-lesson-progress/user-lesson-progress.model';
import { Note } from '../note/note.model';
import { Report } from '../report/report.model';
import { ReportComment } from '../report-comment/report-comment.model';
import { UserQuizProgress } from '../user-quiz-progress/user-quiz-progress.model';
import { DiscountVoucherUser } from '../discount-voucher-user/discount-voucher-user.model';
import { CourseView } from '../course-view/course-view.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:true})
    type!: string | null;

    @Field(() => String, {nullable:true})
    name!: string | null;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:true})
    phone!: string | null;

    @Field(() => String, {nullable:true})
    address!: string | null;

    @Field(() => String, {nullable:true})
    avatar!: string | null;

    @Field(() => String, {nullable:true})
    googleId!: string | null;

    @Field(() => String, {nullable:true})
    password!: string | null;

    @Field(() => Boolean, {nullable:true,defaultValue:false})
    deleted!: boolean | null;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => Date, {nullable:true})
    deleted_at!: Date | null;

    @Field(() => String, {nullable:true})
    created_by_id!: string | null;

    @Field(() => String, {nullable:true})
    updated_by_id!: string | null;

    @Field(() => String, {nullable:true})
    deleted_by_id!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    verified!: boolean;

    @Field(() => String, {nullable:true})
    verifyToken!: string | null;

    @Field(() => Date, {nullable:true})
    verifyExpires!: Date | null;

    @Field(() => String, {nullable:true})
    passwordResetToken!: string | null;

    @Field(() => Date, {nullable:true})
    passwordResetExpires!: Date | null;

    @Field(() => User, {nullable:true})
    created_by?: User | null;

    @Field(() => [User], {nullable:true})
    createds?: Array<User>;

    @Field(() => User, {nullable:true})
    updated_by?: User | null;

    @Field(() => [User], {nullable:true})
    updateds?: Array<User>;

    @Field(() => User, {nullable:true})
    deleted_by?: User | null;

    @Field(() => [User], {nullable:true})
    deleteds?: Array<User>;

    @Field(() => [Notification], {nullable:true})
    notifications?: Array<Notification>;

    @Field(() => [UserNotification], {nullable:true})
    userNotifications?: Array<UserNotification>;

    @Field(() => [UserCourse], {nullable:true})
    user_courses?: Array<UserCourse>;

    @Field(() => [Comment], {nullable:true})
    comments?: Array<Comment>;

    @Field(() => [CourseReview], {nullable:true})
    courseReviews?: Array<CourseReview>;

    @Field(() => [Order], {nullable:true})
    orders?: Array<Order>;

    @Field(() => [DiscountVoucherUsage], {nullable:true})
    discount_vouchers?: Array<DiscountVoucherUsage>;

    @Field(() => [CartItem], {nullable:true})
    cartItems?: Array<CartItem>;

    @Field(() => [UserLessonProgress], {nullable:true})
    user_lesson_progress?: Array<UserLessonProgress>;

    @Field(() => [Note], {nullable:true})
    notes?: Array<Note>;

    @Field(() => [Report], {nullable:true})
    reports?: Array<Report>;

    @Field(() => [ReportComment], {nullable:true})
    reportComments?: Array<ReportComment>;

    @Field(() => [Report], {nullable:true})
    resolved_reports?: Array<Report>;

    @Field(() => [UserQuizProgress], {nullable:true})
    quiz_progress?: Array<UserQuizProgress>;

    @Field(() => [DiscountVoucherUser], {nullable:true})
    allowed_discount_vouchers?: Array<DiscountVoucherUser>;

    @Field(() => [CourseView], {nullable:true})
    course_view?: Array<CourseView>;

    @Field(() => UserCount, {nullable:false})
    _count?: UserCount;
}
