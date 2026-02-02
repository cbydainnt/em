import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableBoolFieldUpdateOperationsInput } from '../prisma/nullable-bool-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { UserUpdateOneWithoutCreatedsNestedInput } from './user-update-one-without-createds-nested.input';
import { UserUpdateManyWithoutCreated_byNestedInput } from './user-update-many-without-created-by-nested.input';
import { UserUpdateOneWithoutUpdatedsNestedInput } from './user-update-one-without-updateds-nested.input';
import { UserUpdateManyWithoutUpdated_byNestedInput } from './user-update-many-without-updated-by-nested.input';
import { UserUpdateOneWithoutDeletedsNestedInput } from './user-update-one-without-deleteds-nested.input';
import { UserUpdateManyWithoutDeleted_byNestedInput } from './user-update-many-without-deleted-by-nested.input';
import { NotificationUpdateManyWithoutUserNestedInput } from '../notification/notification-update-many-without-user-nested.input';
import { UserCourseUpdateManyWithoutUserNestedInput } from '../user-course/user-course-update-many-without-user-nested.input';
import { CommentUpdateManyWithoutUserNestedInput } from '../comment/comment-update-many-without-user-nested.input';
import { CourseReviewUpdateManyWithoutUserNestedInput } from '../course-review/course-review-update-many-without-user-nested.input';
import { OrderUpdateManyWithoutUserNestedInput } from '../order/order-update-many-without-user-nested.input';
import { DiscountVoucherUsageUpdateManyWithoutUserNestedInput } from '../discount-voucher-usage/discount-voucher-usage-update-many-without-user-nested.input';
import { CartItemUpdateManyWithoutUserNestedInput } from '../cart-item/cart-item-update-many-without-user-nested.input';
import { UserLessonProgressUpdateManyWithoutUserNestedInput } from '../user-lesson-progress/user-lesson-progress-update-many-without-user-nested.input';
import { NoteUpdateManyWithoutUserNestedInput } from '../note/note-update-many-without-user-nested.input';
import { ReportUpdateManyWithoutUserNestedInput } from '../report/report-update-many-without-user-nested.input';
import { ReportCommentUpdateManyWithoutUserNestedInput } from '../report-comment/report-comment-update-many-without-user-nested.input';
import { ReportUpdateManyWithoutResolverNestedInput } from '../report/report-update-many-without-resolver-nested.input';
import { UserQuizProgressUpdateManyWithoutUserNestedInput } from '../user-quiz-progress/user-quiz-progress-update-many-without-user-nested.input';
import { DiscountVoucherUserUpdateManyWithoutUserNestedInput } from '../discount-voucher-user/discount-voucher-user-update-many-without-user-nested.input';
import { CourseViewUpdateManyWithoutUserNestedInput } from '../course-view/course-view-update-many-without-user-nested.input';

@InputType()
export class UserUpdateWithoutUserNotificationsInput {

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    type?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: NullableStringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    address?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    avatar?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    googleId?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    password?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableBoolFieldUpdateOperationsInput, {nullable:true})
    deleted?: NullableBoolFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updated_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    verified?: BoolFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    verifyToken?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    verifyExpires?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    passwordResetToken?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneWithoutCreatedsNestedInput, {nullable:true})
    created_by?: UserUpdateOneWithoutCreatedsNestedInput;

    @Field(() => UserUpdateManyWithoutCreated_byNestedInput, {nullable:true})
    createds?: UserUpdateManyWithoutCreated_byNestedInput;

    @Field(() => UserUpdateOneWithoutUpdatedsNestedInput, {nullable:true})
    updated_by?: UserUpdateOneWithoutUpdatedsNestedInput;

    @Field(() => UserUpdateManyWithoutUpdated_byNestedInput, {nullable:true})
    updateds?: UserUpdateManyWithoutUpdated_byNestedInput;

    @Field(() => UserUpdateOneWithoutDeletedsNestedInput, {nullable:true})
    deleted_by?: UserUpdateOneWithoutDeletedsNestedInput;

    @Field(() => UserUpdateManyWithoutDeleted_byNestedInput, {nullable:true})
    deleteds?: UserUpdateManyWithoutDeleted_byNestedInput;

    @Field(() => NotificationUpdateManyWithoutUserNestedInput, {nullable:true})
    notifications?: NotificationUpdateManyWithoutUserNestedInput;

    @Field(() => UserCourseUpdateManyWithoutUserNestedInput, {nullable:true})
    user_courses?: UserCourseUpdateManyWithoutUserNestedInput;

    @Field(() => CommentUpdateManyWithoutUserNestedInput, {nullable:true})
    comments?: CommentUpdateManyWithoutUserNestedInput;

    @Field(() => CourseReviewUpdateManyWithoutUserNestedInput, {nullable:true})
    courseReviews?: CourseReviewUpdateManyWithoutUserNestedInput;

    @Field(() => OrderUpdateManyWithoutUserNestedInput, {nullable:true})
    orders?: OrderUpdateManyWithoutUserNestedInput;

    @Field(() => DiscountVoucherUsageUpdateManyWithoutUserNestedInput, {nullable:true})
    discount_vouchers?: DiscountVoucherUsageUpdateManyWithoutUserNestedInput;

    @Field(() => CartItemUpdateManyWithoutUserNestedInput, {nullable:true})
    cartItems?: CartItemUpdateManyWithoutUserNestedInput;

    @Field(() => UserLessonProgressUpdateManyWithoutUserNestedInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressUpdateManyWithoutUserNestedInput;

    @Field(() => NoteUpdateManyWithoutUserNestedInput, {nullable:true})
    notes?: NoteUpdateManyWithoutUserNestedInput;

    @Field(() => ReportUpdateManyWithoutUserNestedInput, {nullable:true})
    reports?: ReportUpdateManyWithoutUserNestedInput;

    @Field(() => ReportCommentUpdateManyWithoutUserNestedInput, {nullable:true})
    reportComments?: ReportCommentUpdateManyWithoutUserNestedInput;

    @Field(() => ReportUpdateManyWithoutResolverNestedInput, {nullable:true})
    resolved_reports?: ReportUpdateManyWithoutResolverNestedInput;

    @Field(() => UserQuizProgressUpdateManyWithoutUserNestedInput, {nullable:true})
    quiz_progress?: UserQuizProgressUpdateManyWithoutUserNestedInput;

    @Field(() => DiscountVoucherUserUpdateManyWithoutUserNestedInput, {nullable:true})
    allowed_discount_vouchers?: DiscountVoucherUserUpdateManyWithoutUserNestedInput;

    @Field(() => CourseViewUpdateManyWithoutUserNestedInput, {nullable:true})
    course_view?: CourseViewUpdateManyWithoutUserNestedInput;
}
