import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableBoolFieldUpdateOperationsInput } from '../prisma/nullable-bool-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { UserUncheckedUpdateManyWithoutCreated_byNestedInput } from './user-unchecked-update-many-without-created-by-nested.input';
import { UserUncheckedUpdateManyWithoutUpdated_byNestedInput } from './user-unchecked-update-many-without-updated-by-nested.input';
import { UserUncheckedUpdateManyWithoutDeleted_byNestedInput } from './user-unchecked-update-many-without-deleted-by-nested.input';
import { NotificationUncheckedUpdateManyWithoutUserNestedInput } from '../notification/notification-unchecked-update-many-without-user-nested.input';
import { UserNotificationUncheckedUpdateManyWithoutUserNestedInput } from '../user-notification/user-notification-unchecked-update-many-without-user-nested.input';
import { UserCourseUncheckedUpdateManyWithoutUserNestedInput } from '../user-course/user-course-unchecked-update-many-without-user-nested.input';
import { CommentUncheckedUpdateManyWithoutUserNestedInput } from '../comment/comment-unchecked-update-many-without-user-nested.input';
import { CourseReviewUncheckedUpdateManyWithoutUserNestedInput } from '../course-review/course-review-unchecked-update-many-without-user-nested.input';
import { OrderUncheckedUpdateManyWithoutUserNestedInput } from '../order/order-unchecked-update-many-without-user-nested.input';
import { DiscountVoucherUsageUncheckedUpdateManyWithoutUserNestedInput } from '../discount-voucher-usage/discount-voucher-usage-unchecked-update-many-without-user-nested.input';
import { CartItemUncheckedUpdateManyWithoutUserNestedInput } from '../cart-item/cart-item-unchecked-update-many-without-user-nested.input';
import { UserLessonProgressUncheckedUpdateManyWithoutUserNestedInput } from '../user-lesson-progress/user-lesson-progress-unchecked-update-many-without-user-nested.input';
import { NoteUncheckedUpdateManyWithoutUserNestedInput } from '../note/note-unchecked-update-many-without-user-nested.input';
import { ReportUncheckedUpdateManyWithoutUserNestedInput } from '../report/report-unchecked-update-many-without-user-nested.input';
import { ReportCommentUncheckedUpdateManyWithoutUserNestedInput } from '../report-comment/report-comment-unchecked-update-many-without-user-nested.input';
import { ReportUncheckedUpdateManyWithoutResolverNestedInput } from '../report/report-unchecked-update-many-without-resolver-nested.input';
import { UserQuizProgressUncheckedUpdateManyWithoutUserNestedInput } from '../user-quiz-progress/user-quiz-progress-unchecked-update-many-without-user-nested.input';
import { DiscountVoucherUserUncheckedUpdateManyWithoutUserNestedInput } from '../discount-voucher-user/discount-voucher-user-unchecked-update-many-without-user-nested.input';

@InputType()
export class UserUncheckedUpdateWithoutCourse_viewInput {

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

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    created_by_id?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    updated_by_id?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    deleted_by_id?: NullableStringFieldUpdateOperationsInput;

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

    @Field(() => UserUncheckedUpdateManyWithoutCreated_byNestedInput, {nullable:true})
    createds?: UserUncheckedUpdateManyWithoutCreated_byNestedInput;

    @Field(() => UserUncheckedUpdateManyWithoutUpdated_byNestedInput, {nullable:true})
    updateds?: UserUncheckedUpdateManyWithoutUpdated_byNestedInput;

    @Field(() => UserUncheckedUpdateManyWithoutDeleted_byNestedInput, {nullable:true})
    deleteds?: UserUncheckedUpdateManyWithoutDeleted_byNestedInput;

    @Field(() => NotificationUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => UserNotificationUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    userNotifications?: UserNotificationUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => UserCourseUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    user_courses?: UserCourseUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => CommentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => CourseReviewUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    courseReviews?: CourseReviewUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => OrderUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => DiscountVoucherUsageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    discount_vouchers?: DiscountVoucherUsageUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => CartItemUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    cartItems?: CartItemUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => UserLessonProgressUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => NoteUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    notes?: NoteUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => ReportUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => ReportCommentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    reportComments?: ReportCommentUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => ReportUncheckedUpdateManyWithoutResolverNestedInput, {nullable:true})
    resolved_reports?: ReportUncheckedUpdateManyWithoutResolverNestedInput;

    @Field(() => UserQuizProgressUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    quiz_progress?: UserQuizProgressUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => DiscountVoucherUserUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    allowed_discount_vouchers?: DiscountVoucherUserUncheckedUpdateManyWithoutUserNestedInput;
}
