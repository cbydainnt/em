import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserCourseOrderByRelationAggregateInput } from '../user-course/user-course-order-by-relation-aggregate.input';
import { ComboCourseOrderByRelationAggregateInput } from '../combo-course/combo-course-order-by-relation-aggregate.input';
import { CommentOrderByRelationAggregateInput } from '../comment/comment-order-by-relation-aggregate.input';
import { NotificationOrderByRelationAggregateInput } from '../notification/notification-order-by-relation-aggregate.input';
import { SectionOrderByRelationAggregateInput } from '../section/section-order-by-relation-aggregate.input';
import { CourseReviewOrderByRelationAggregateInput } from '../course-review/course-review-order-by-relation-aggregate.input';
import { RatingSummaryOrderByWithRelationInput } from '../rating-summary/rating-summary-order-by-with-relation.input';
import { OrderItemOrderByRelationAggregateInput } from '../order-item/order-item-order-by-relation-aggregate.input';
import { CartItemOrderByRelationAggregateInput } from '../cart-item/cart-item-order-by-relation-aggregate.input';
import { UserLessonProgressOrderByRelationAggregateInput } from '../user-lesson-progress/user-lesson-progress-order-by-relation-aggregate.input';
import { UserQuizProgressOrderByRelationAggregateInput } from '../user-quiz-progress/user-quiz-progress-order-by-relation-aggregate.input';
import { ReportOrderByRelationAggregateInput } from '../report/report-order-by-relation-aggregate.input';
import { CourseViewOrderByRelationAggregateInput } from '../course-view/course-view-order-by-relation-aggregate.input';
import { DiscountVoucherItemOrderByRelationAggregateInput } from '../discount-voucher-item/discount-voucher-item-order-by-relation-aggregate.input';
import { QuizOrderByRelationAggregateInput } from '../quiz/quiz-order-by-relation-aggregate.input';

@InputType()
export class CourseOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_description?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_original_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    state?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    target?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    thumbnail?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_duration_months?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_expire_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    view_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => UserCourseOrderByRelationAggregateInput, {nullable:true})
    user_courses?: UserCourseOrderByRelationAggregateInput;

    @Field(() => ComboCourseOrderByRelationAggregateInput, {nullable:true})
    combos?: ComboCourseOrderByRelationAggregateInput;

    @Field(() => CommentOrderByRelationAggregateInput, {nullable:true})
    comments?: CommentOrderByRelationAggregateInput;

    @Field(() => NotificationOrderByRelationAggregateInput, {nullable:true})
    notifications?: NotificationOrderByRelationAggregateInput;

    @Field(() => SectionOrderByRelationAggregateInput, {nullable:true})
    sections?: SectionOrderByRelationAggregateInput;

    @Field(() => CourseReviewOrderByRelationAggregateInput, {nullable:true})
    courseReviews?: CourseReviewOrderByRelationAggregateInput;

    @Field(() => RatingSummaryOrderByWithRelationInput, {nullable:true})
    ratingSummary?: RatingSummaryOrderByWithRelationInput;

    @Field(() => OrderItemOrderByRelationAggregateInput, {nullable:true})
    order_items?: OrderItemOrderByRelationAggregateInput;

    @Field(() => CartItemOrderByRelationAggregateInput, {nullable:true})
    cart_items?: CartItemOrderByRelationAggregateInput;

    @Field(() => UserLessonProgressOrderByRelationAggregateInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressOrderByRelationAggregateInput;

    @Field(() => UserQuizProgressOrderByRelationAggregateInput, {nullable:true})
    user_quiz_progress?: UserQuizProgressOrderByRelationAggregateInput;

    @Field(() => ReportOrderByRelationAggregateInput, {nullable:true})
    reports?: ReportOrderByRelationAggregateInput;

    @Field(() => CourseViewOrderByRelationAggregateInput, {nullable:true})
    course_view?: CourseViewOrderByRelationAggregateInput;

    @Field(() => DiscountVoucherItemOrderByRelationAggregateInput, {nullable:true})
    discount_vouchers?: DiscountVoucherItemOrderByRelationAggregateInput;

    @Field(() => QuizOrderByRelationAggregateInput, {nullable:true})
    quizzes?: QuizOrderByRelationAggregateInput;
}
