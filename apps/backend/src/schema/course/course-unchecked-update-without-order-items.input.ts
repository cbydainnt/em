import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { UserCourseUncheckedUpdateManyWithoutCourseNestedInput } from '../user-course/user-course-unchecked-update-many-without-course-nested.input';
import { ComboCourseUncheckedUpdateManyWithoutCourseNestedInput } from '../combo-course/combo-course-unchecked-update-many-without-course-nested.input';
import { CommentUncheckedUpdateManyWithoutCourseNestedInput } from '../comment/comment-unchecked-update-many-without-course-nested.input';
import { NotificationUncheckedUpdateManyWithoutCourseNestedInput } from '../notification/notification-unchecked-update-many-without-course-nested.input';
import { SectionUncheckedUpdateManyWithoutCourseNestedInput } from '../section/section-unchecked-update-many-without-course-nested.input';
import { CourseReviewUncheckedUpdateManyWithoutCourseNestedInput } from '../course-review/course-review-unchecked-update-many-without-course-nested.input';
import { RatingSummaryUncheckedUpdateOneWithoutCourseNestedInput } from '../rating-summary/rating-summary-unchecked-update-one-without-course-nested.input';
import { CartItemUncheckedUpdateManyWithoutCourseNestedInput } from '../cart-item/cart-item-unchecked-update-many-without-course-nested.input';
import { UserLessonProgressUncheckedUpdateManyWithoutCourseNestedInput } from '../user-lesson-progress/user-lesson-progress-unchecked-update-many-without-course-nested.input';
import { UserQuizProgressUncheckedUpdateManyWithoutCourseNestedInput } from '../user-quiz-progress/user-quiz-progress-unchecked-update-many-without-course-nested.input';
import { ReportUncheckedUpdateManyWithoutCourseNestedInput } from '../report/report-unchecked-update-many-without-course-nested.input';
import { CourseViewUncheckedUpdateManyWithoutCourseNestedInput } from '../course-view/course-view-unchecked-update-many-without-course-nested.input';
import { DiscountVoucherItemUncheckedUpdateManyWithoutCourseNestedInput } from '../discount-voucher-item/discount-voucher-item-unchecked-update-many-without-course-nested.input';
import { QuizUncheckedUpdateManyWithoutCourseNestedInput } from '../quiz/quiz-unchecked-update-many-without-course-nested.input';

@InputType()
export class CourseUncheckedUpdateWithoutOrder_itemsInput {

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

    @Field(() => UserCourseUncheckedUpdateManyWithoutCourseNestedInput, {nullable:true})
    user_courses?: UserCourseUncheckedUpdateManyWithoutCourseNestedInput;

    @Field(() => ComboCourseUncheckedUpdateManyWithoutCourseNestedInput, {nullable:true})
    combos?: ComboCourseUncheckedUpdateManyWithoutCourseNestedInput;

    @Field(() => CommentUncheckedUpdateManyWithoutCourseNestedInput, {nullable:true})
    comments?: CommentUncheckedUpdateManyWithoutCourseNestedInput;

    @Field(() => NotificationUncheckedUpdateManyWithoutCourseNestedInput, {nullable:true})
    notifications?: NotificationUncheckedUpdateManyWithoutCourseNestedInput;

    @Field(() => SectionUncheckedUpdateManyWithoutCourseNestedInput, {nullable:true})
    sections?: SectionUncheckedUpdateManyWithoutCourseNestedInput;

    @Field(() => CourseReviewUncheckedUpdateManyWithoutCourseNestedInput, {nullable:true})
    courseReviews?: CourseReviewUncheckedUpdateManyWithoutCourseNestedInput;

    @Field(() => RatingSummaryUncheckedUpdateOneWithoutCourseNestedInput, {nullable:true})
    ratingSummary?: RatingSummaryUncheckedUpdateOneWithoutCourseNestedInput;

    @Field(() => CartItemUncheckedUpdateManyWithoutCourseNestedInput, {nullable:true})
    cart_items?: CartItemUncheckedUpdateManyWithoutCourseNestedInput;

    @Field(() => UserLessonProgressUncheckedUpdateManyWithoutCourseNestedInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressUncheckedUpdateManyWithoutCourseNestedInput;

    @Field(() => UserQuizProgressUncheckedUpdateManyWithoutCourseNestedInput, {nullable:true})
    user_quiz_progress?: UserQuizProgressUncheckedUpdateManyWithoutCourseNestedInput;

    @Field(() => ReportUncheckedUpdateManyWithoutCourseNestedInput, {nullable:true})
    reports?: ReportUncheckedUpdateManyWithoutCourseNestedInput;

    @Field(() => CourseViewUncheckedUpdateManyWithoutCourseNestedInput, {nullable:true})
    course_view?: CourseViewUncheckedUpdateManyWithoutCourseNestedInput;

    @Field(() => DiscountVoucherItemUncheckedUpdateManyWithoutCourseNestedInput, {nullable:true})
    discount_vouchers?: DiscountVoucherItemUncheckedUpdateManyWithoutCourseNestedInput;

    @Field(() => QuizUncheckedUpdateManyWithoutCourseNestedInput, {nullable:true})
    quizzes?: QuizUncheckedUpdateManyWithoutCourseNestedInput;
}
