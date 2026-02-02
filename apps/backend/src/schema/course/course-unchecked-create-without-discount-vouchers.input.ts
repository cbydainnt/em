import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserCourseUncheckedCreateNestedManyWithoutCourseInput } from '../user-course/user-course-unchecked-create-nested-many-without-course.input';
import { ComboCourseUncheckedCreateNestedManyWithoutCourseInput } from '../combo-course/combo-course-unchecked-create-nested-many-without-course.input';
import { CommentUncheckedCreateNestedManyWithoutCourseInput } from '../comment/comment-unchecked-create-nested-many-without-course.input';
import { NotificationUncheckedCreateNestedManyWithoutCourseInput } from '../notification/notification-unchecked-create-nested-many-without-course.input';
import { SectionUncheckedCreateNestedManyWithoutCourseInput } from '../section/section-unchecked-create-nested-many-without-course.input';
import { CourseReviewUncheckedCreateNestedManyWithoutCourseInput } from '../course-review/course-review-unchecked-create-nested-many-without-course.input';
import { RatingSummaryUncheckedCreateNestedOneWithoutCourseInput } from '../rating-summary/rating-summary-unchecked-create-nested-one-without-course.input';
import { OrderItemUncheckedCreateNestedManyWithoutCourseInput } from '../order-item/order-item-unchecked-create-nested-many-without-course.input';
import { CartItemUncheckedCreateNestedManyWithoutCourseInput } from '../cart-item/cart-item-unchecked-create-nested-many-without-course.input';
import { UserLessonProgressUncheckedCreateNestedManyWithoutCourseInput } from '../user-lesson-progress/user-lesson-progress-unchecked-create-nested-many-without-course.input';
import { UserQuizProgressUncheckedCreateNestedManyWithoutCourseInput } from '../user-quiz-progress/user-quiz-progress-unchecked-create-nested-many-without-course.input';
import { ReportUncheckedCreateNestedManyWithoutCourseInput } from '../report/report-unchecked-create-nested-many-without-course.input';
import { CourseViewUncheckedCreateNestedManyWithoutCourseInput } from '../course-view/course-view-unchecked-create-nested-many-without-course.input';
import { QuizUncheckedCreateNestedManyWithoutCourseInput } from '../quiz/quiz-unchecked-create-nested-many-without-course.input';

@InputType()
export class CourseUncheckedCreateWithoutDiscount_vouchersInput {

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:false})
    course_name!: string;

    @Field(() => String, {nullable:false})
    course_description!: string;

    @Field(() => Int, {nullable:false})
    course_price!: number;

    @Field(() => Int, {nullable:false})
    course_original_price!: number;

    @Field(() => String, {nullable:false})
    state!: string;

    @Field(() => String, {nullable:true})
    target?: string;

    @Field(() => String, {nullable:true})
    thumbnail?: string;

    @Field(() => Int, {nullable:true})
    access_duration_months?: number;

    @Field(() => Int, {nullable:true})
    access_type?: number;

    @Field(() => Date, {nullable:true})
    access_expire_at?: Date | string;

    @Field(() => Int, {nullable:true})
    view_count?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => UserCourseUncheckedCreateNestedManyWithoutCourseInput, {nullable:true})
    user_courses?: UserCourseUncheckedCreateNestedManyWithoutCourseInput;

    @Field(() => ComboCourseUncheckedCreateNestedManyWithoutCourseInput, {nullable:true})
    combos?: ComboCourseUncheckedCreateNestedManyWithoutCourseInput;

    @Field(() => CommentUncheckedCreateNestedManyWithoutCourseInput, {nullable:true})
    comments?: CommentUncheckedCreateNestedManyWithoutCourseInput;

    @Field(() => NotificationUncheckedCreateNestedManyWithoutCourseInput, {nullable:true})
    notifications?: NotificationUncheckedCreateNestedManyWithoutCourseInput;

    @Field(() => SectionUncheckedCreateNestedManyWithoutCourseInput, {nullable:true})
    sections?: SectionUncheckedCreateNestedManyWithoutCourseInput;

    @Field(() => CourseReviewUncheckedCreateNestedManyWithoutCourseInput, {nullable:true})
    courseReviews?: CourseReviewUncheckedCreateNestedManyWithoutCourseInput;

    @Field(() => RatingSummaryUncheckedCreateNestedOneWithoutCourseInput, {nullable:true})
    ratingSummary?: RatingSummaryUncheckedCreateNestedOneWithoutCourseInput;

    @Field(() => OrderItemUncheckedCreateNestedManyWithoutCourseInput, {nullable:true})
    order_items?: OrderItemUncheckedCreateNestedManyWithoutCourseInput;

    @Field(() => CartItemUncheckedCreateNestedManyWithoutCourseInput, {nullable:true})
    cart_items?: CartItemUncheckedCreateNestedManyWithoutCourseInput;

    @Field(() => UserLessonProgressUncheckedCreateNestedManyWithoutCourseInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressUncheckedCreateNestedManyWithoutCourseInput;

    @Field(() => UserQuizProgressUncheckedCreateNestedManyWithoutCourseInput, {nullable:true})
    user_quiz_progress?: UserQuizProgressUncheckedCreateNestedManyWithoutCourseInput;

    @Field(() => ReportUncheckedCreateNestedManyWithoutCourseInput, {nullable:true})
    reports?: ReportUncheckedCreateNestedManyWithoutCourseInput;

    @Field(() => CourseViewUncheckedCreateNestedManyWithoutCourseInput, {nullable:true})
    course_view?: CourseViewUncheckedCreateNestedManyWithoutCourseInput;

    @Field(() => QuizUncheckedCreateNestedManyWithoutCourseInput, {nullable:true})
    quizzes?: QuizUncheckedCreateNestedManyWithoutCourseInput;
}
