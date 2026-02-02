import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserCourseCreateNestedManyWithoutCourseInput } from '../user-course/user-course-create-nested-many-without-course.input';
import { ComboCourseCreateNestedManyWithoutCourseInput } from '../combo-course/combo-course-create-nested-many-without-course.input';
import { CommentCreateNestedManyWithoutCourseInput } from '../comment/comment-create-nested-many-without-course.input';
import { NotificationCreateNestedManyWithoutCourseInput } from '../notification/notification-create-nested-many-without-course.input';
import { SectionCreateNestedManyWithoutCourseInput } from '../section/section-create-nested-many-without-course.input';
import { CourseReviewCreateNestedManyWithoutCourseInput } from '../course-review/course-review-create-nested-many-without-course.input';
import { RatingSummaryCreateNestedOneWithoutCourseInput } from '../rating-summary/rating-summary-create-nested-one-without-course.input';
import { OrderItemCreateNestedManyWithoutCourseInput } from '../order-item/order-item-create-nested-many-without-course.input';
import { CartItemCreateNestedManyWithoutCourseInput } from '../cart-item/cart-item-create-nested-many-without-course.input';
import { UserLessonProgressCreateNestedManyWithoutCourseInput } from '../user-lesson-progress/user-lesson-progress-create-nested-many-without-course.input';
import { ReportCreateNestedManyWithoutCourseInput } from '../report/report-create-nested-many-without-course.input';
import { CourseViewCreateNestedManyWithoutCourseInput } from '../course-view/course-view-create-nested-many-without-course.input';
import { DiscountVoucherItemCreateNestedManyWithoutCourseInput } from '../discount-voucher-item/discount-voucher-item-create-nested-many-without-course.input';
import { QuizCreateNestedManyWithoutCourseInput } from '../quiz/quiz-create-nested-many-without-course.input';

@InputType()
export class CourseCreateWithoutUser_quiz_progressInput {

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

    @Field(() => UserCourseCreateNestedManyWithoutCourseInput, {nullable:true})
    user_courses?: UserCourseCreateNestedManyWithoutCourseInput;

    @Field(() => ComboCourseCreateNestedManyWithoutCourseInput, {nullable:true})
    combos?: ComboCourseCreateNestedManyWithoutCourseInput;

    @Field(() => CommentCreateNestedManyWithoutCourseInput, {nullable:true})
    comments?: CommentCreateNestedManyWithoutCourseInput;

    @Field(() => NotificationCreateNestedManyWithoutCourseInput, {nullable:true})
    notifications?: NotificationCreateNestedManyWithoutCourseInput;

    @Field(() => SectionCreateNestedManyWithoutCourseInput, {nullable:true})
    sections?: SectionCreateNestedManyWithoutCourseInput;

    @Field(() => CourseReviewCreateNestedManyWithoutCourseInput, {nullable:true})
    courseReviews?: CourseReviewCreateNestedManyWithoutCourseInput;

    @Field(() => RatingSummaryCreateNestedOneWithoutCourseInput, {nullable:true})
    ratingSummary?: RatingSummaryCreateNestedOneWithoutCourseInput;

    @Field(() => OrderItemCreateNestedManyWithoutCourseInput, {nullable:true})
    order_items?: OrderItemCreateNestedManyWithoutCourseInput;

    @Field(() => CartItemCreateNestedManyWithoutCourseInput, {nullable:true})
    cart_items?: CartItemCreateNestedManyWithoutCourseInput;

    @Field(() => UserLessonProgressCreateNestedManyWithoutCourseInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressCreateNestedManyWithoutCourseInput;

    @Field(() => ReportCreateNestedManyWithoutCourseInput, {nullable:true})
    reports?: ReportCreateNestedManyWithoutCourseInput;

    @Field(() => CourseViewCreateNestedManyWithoutCourseInput, {nullable:true})
    course_view?: CourseViewCreateNestedManyWithoutCourseInput;

    @Field(() => DiscountVoucherItemCreateNestedManyWithoutCourseInput, {nullable:true})
    discount_vouchers?: DiscountVoucherItemCreateNestedManyWithoutCourseInput;

    @Field(() => QuizCreateNestedManyWithoutCourseInput, {nullable:true})
    quizzes?: QuizCreateNestedManyWithoutCourseInput;
}
