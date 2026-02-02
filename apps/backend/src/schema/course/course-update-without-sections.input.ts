import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { UserCourseUpdateManyWithoutCourseNestedInput } from '../user-course/user-course-update-many-without-course-nested.input';
import { ComboCourseUpdateManyWithoutCourseNestedInput } from '../combo-course/combo-course-update-many-without-course-nested.input';
import { CommentUpdateManyWithoutCourseNestedInput } from '../comment/comment-update-many-without-course-nested.input';
import { NotificationUpdateManyWithoutCourseNestedInput } from '../notification/notification-update-many-without-course-nested.input';
import { CourseReviewUpdateManyWithoutCourseNestedInput } from '../course-review/course-review-update-many-without-course-nested.input';
import { RatingSummaryUpdateOneWithoutCourseNestedInput } from '../rating-summary/rating-summary-update-one-without-course-nested.input';
import { OrderItemUpdateManyWithoutCourseNestedInput } from '../order-item/order-item-update-many-without-course-nested.input';
import { CartItemUpdateManyWithoutCourseNestedInput } from '../cart-item/cart-item-update-many-without-course-nested.input';
import { UserLessonProgressUpdateManyWithoutCourseNestedInput } from '../user-lesson-progress/user-lesson-progress-update-many-without-course-nested.input';
import { UserQuizProgressUpdateManyWithoutCourseNestedInput } from '../user-quiz-progress/user-quiz-progress-update-many-without-course-nested.input';
import { ReportUpdateManyWithoutCourseNestedInput } from '../report/report-update-many-without-course-nested.input';
import { CourseViewUpdateManyWithoutCourseNestedInput } from '../course-view/course-view-update-many-without-course-nested.input';
import { DiscountVoucherItemUpdateManyWithoutCourseNestedInput } from '../discount-voucher-item/discount-voucher-item-update-many-without-course-nested.input';
import { QuizUpdateManyWithoutCourseNestedInput } from '../quiz/quiz-update-many-without-course-nested.input';

@InputType()
export class CourseUpdateWithoutSectionsInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    course_name?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    course_description?: StringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    course_price?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    course_original_price?: IntFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    state?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    target?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    thumbnail?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    access_duration_months?: NullableIntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    access_type?: IntFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    access_expire_at?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    view_count?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updated_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    created_by?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    updated_by?: NullableStringFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    del_flg?: BoolFieldUpdateOperationsInput;

    @Field(() => UserCourseUpdateManyWithoutCourseNestedInput, {nullable:true})
    user_courses?: UserCourseUpdateManyWithoutCourseNestedInput;

    @Field(() => ComboCourseUpdateManyWithoutCourseNestedInput, {nullable:true})
    combos?: ComboCourseUpdateManyWithoutCourseNestedInput;

    @Field(() => CommentUpdateManyWithoutCourseNestedInput, {nullable:true})
    comments?: CommentUpdateManyWithoutCourseNestedInput;

    @Field(() => NotificationUpdateManyWithoutCourseNestedInput, {nullable:true})
    notifications?: NotificationUpdateManyWithoutCourseNestedInput;

    @Field(() => CourseReviewUpdateManyWithoutCourseNestedInput, {nullable:true})
    courseReviews?: CourseReviewUpdateManyWithoutCourseNestedInput;

    @Field(() => RatingSummaryUpdateOneWithoutCourseNestedInput, {nullable:true})
    ratingSummary?: RatingSummaryUpdateOneWithoutCourseNestedInput;

    @Field(() => OrderItemUpdateManyWithoutCourseNestedInput, {nullable:true})
    order_items?: OrderItemUpdateManyWithoutCourseNestedInput;

    @Field(() => CartItemUpdateManyWithoutCourseNestedInput, {nullable:true})
    cart_items?: CartItemUpdateManyWithoutCourseNestedInput;

    @Field(() => UserLessonProgressUpdateManyWithoutCourseNestedInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressUpdateManyWithoutCourseNestedInput;

    @Field(() => UserQuizProgressUpdateManyWithoutCourseNestedInput, {nullable:true})
    user_quiz_progress?: UserQuizProgressUpdateManyWithoutCourseNestedInput;

    @Field(() => ReportUpdateManyWithoutCourseNestedInput, {nullable:true})
    reports?: ReportUpdateManyWithoutCourseNestedInput;

    @Field(() => CourseViewUpdateManyWithoutCourseNestedInput, {nullable:true})
    course_view?: CourseViewUpdateManyWithoutCourseNestedInput;

    @Field(() => DiscountVoucherItemUpdateManyWithoutCourseNestedInput, {nullable:true})
    discount_vouchers?: DiscountVoucherItemUpdateManyWithoutCourseNestedInput;

    @Field(() => QuizUpdateManyWithoutCourseNestedInput, {nullable:true})
    quizzes?: QuizUpdateManyWithoutCourseNestedInput;
}
