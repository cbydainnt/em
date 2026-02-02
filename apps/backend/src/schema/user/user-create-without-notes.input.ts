import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutCreatedsInput } from './user-create-nested-one-without-createds.input';
import { UserCreateNestedManyWithoutCreated_byInput } from './user-create-nested-many-without-created-by.input';
import { UserCreateNestedOneWithoutUpdatedsInput } from './user-create-nested-one-without-updateds.input';
import { UserCreateNestedManyWithoutUpdated_byInput } from './user-create-nested-many-without-updated-by.input';
import { UserCreateNestedOneWithoutDeletedsInput } from './user-create-nested-one-without-deleteds.input';
import { UserCreateNestedManyWithoutDeleted_byInput } from './user-create-nested-many-without-deleted-by.input';
import { NotificationCreateNestedManyWithoutUserInput } from '../notification/notification-create-nested-many-without-user.input';
import { UserNotificationCreateNestedManyWithoutUserInput } from '../user-notification/user-notification-create-nested-many-without-user.input';
import { UserCourseCreateNestedManyWithoutUserInput } from '../user-course/user-course-create-nested-many-without-user.input';
import { CommentCreateNestedManyWithoutUserInput } from '../comment/comment-create-nested-many-without-user.input';
import { CourseReviewCreateNestedManyWithoutUserInput } from '../course-review/course-review-create-nested-many-without-user.input';
import { OrderCreateNestedManyWithoutUserInput } from '../order/order-create-nested-many-without-user.input';
import { DiscountVoucherUsageCreateNestedManyWithoutUserInput } from '../discount-voucher-usage/discount-voucher-usage-create-nested-many-without-user.input';
import { CartItemCreateNestedManyWithoutUserInput } from '../cart-item/cart-item-create-nested-many-without-user.input';
import { UserLessonProgressCreateNestedManyWithoutUserInput } from '../user-lesson-progress/user-lesson-progress-create-nested-many-without-user.input';
import { ReportCreateNestedManyWithoutUserInput } from '../report/report-create-nested-many-without-user.input';
import { ReportCommentCreateNestedManyWithoutUserInput } from '../report-comment/report-comment-create-nested-many-without-user.input';
import { ReportCreateNestedManyWithoutResolverInput } from '../report/report-create-nested-many-without-resolver.input';
import { UserQuizProgressCreateNestedManyWithoutUserInput } from '../user-quiz-progress/user-quiz-progress-create-nested-many-without-user.input';
import { DiscountVoucherUserCreateNestedManyWithoutUserInput } from '../discount-voucher-user/discount-voucher-user-create-nested-many-without-user.input';
import { CourseViewCreateNestedManyWithoutUserInput } from '../course-view/course-view-create-nested-many-without-user.input';

@InputType()
export class UserCreateWithoutNotesInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    type?: string;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:true})
    phone?: string;

    @Field(() => String, {nullable:true})
    address?: string;

    @Field(() => String, {nullable:true})
    avatar?: string;

    @Field(() => String, {nullable:true})
    googleId?: string;

    @Field(() => String, {nullable:true})
    password?: string;

    @Field(() => Boolean, {nullable:true})
    deleted?: boolean;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => Date, {nullable:true})
    deleted_at?: Date | string;

    @Field(() => Boolean, {nullable:true})
    verified?: boolean;

    @Field(() => String, {nullable:true})
    verifyToken?: string;

    @Field(() => Date, {nullable:true})
    verifyExpires?: Date | string;

    @Field(() => String, {nullable:true})
    passwordResetToken?: string;

    @Field(() => Date, {nullable:true})
    passwordResetExpires?: Date | string;

    @Field(() => UserCreateNestedOneWithoutCreatedsInput, {nullable:true})
    created_by?: UserCreateNestedOneWithoutCreatedsInput;

    @Field(() => UserCreateNestedManyWithoutCreated_byInput, {nullable:true})
    createds?: UserCreateNestedManyWithoutCreated_byInput;

    @Field(() => UserCreateNestedOneWithoutUpdatedsInput, {nullable:true})
    updated_by?: UserCreateNestedOneWithoutUpdatedsInput;

    @Field(() => UserCreateNestedManyWithoutUpdated_byInput, {nullable:true})
    updateds?: UserCreateNestedManyWithoutUpdated_byInput;

    @Field(() => UserCreateNestedOneWithoutDeletedsInput, {nullable:true})
    deleted_by?: UserCreateNestedOneWithoutDeletedsInput;

    @Field(() => UserCreateNestedManyWithoutDeleted_byInput, {nullable:true})
    deleteds?: UserCreateNestedManyWithoutDeleted_byInput;

    @Field(() => NotificationCreateNestedManyWithoutUserInput, {nullable:true})
    notifications?: NotificationCreateNestedManyWithoutUserInput;

    @Field(() => UserNotificationCreateNestedManyWithoutUserInput, {nullable:true})
    userNotifications?: UserNotificationCreateNestedManyWithoutUserInput;

    @Field(() => UserCourseCreateNestedManyWithoutUserInput, {nullable:true})
    user_courses?: UserCourseCreateNestedManyWithoutUserInput;

    @Field(() => CommentCreateNestedManyWithoutUserInput, {nullable:true})
    comments?: CommentCreateNestedManyWithoutUserInput;

    @Field(() => CourseReviewCreateNestedManyWithoutUserInput, {nullable:true})
    courseReviews?: CourseReviewCreateNestedManyWithoutUserInput;

    @Field(() => OrderCreateNestedManyWithoutUserInput, {nullable:true})
    orders?: OrderCreateNestedManyWithoutUserInput;

    @Field(() => DiscountVoucherUsageCreateNestedManyWithoutUserInput, {nullable:true})
    discount_vouchers?: DiscountVoucherUsageCreateNestedManyWithoutUserInput;

    @Field(() => CartItemCreateNestedManyWithoutUserInput, {nullable:true})
    cartItems?: CartItemCreateNestedManyWithoutUserInput;

    @Field(() => UserLessonProgressCreateNestedManyWithoutUserInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressCreateNestedManyWithoutUserInput;

    @Field(() => ReportCreateNestedManyWithoutUserInput, {nullable:true})
    reports?: ReportCreateNestedManyWithoutUserInput;

    @Field(() => ReportCommentCreateNestedManyWithoutUserInput, {nullable:true})
    reportComments?: ReportCommentCreateNestedManyWithoutUserInput;

    @Field(() => ReportCreateNestedManyWithoutResolverInput, {nullable:true})
    resolved_reports?: ReportCreateNestedManyWithoutResolverInput;

    @Field(() => UserQuizProgressCreateNestedManyWithoutUserInput, {nullable:true})
    quiz_progress?: UserQuizProgressCreateNestedManyWithoutUserInput;

    @Field(() => DiscountVoucherUserCreateNestedManyWithoutUserInput, {nullable:true})
    allowed_discount_vouchers?: DiscountVoucherUserCreateNestedManyWithoutUserInput;

    @Field(() => CourseViewCreateNestedManyWithoutUserInput, {nullable:true})
    course_view?: CourseViewCreateNestedManyWithoutUserInput;
}
