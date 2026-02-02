import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { UserCourseListRelationFilter } from '../user-course/user-course-list-relation-filter.input';
import { ComboCourseListRelationFilter } from '../combo-course/combo-course-list-relation-filter.input';
import { CommentListRelationFilter } from '../comment/comment-list-relation-filter.input';
import { NotificationListRelationFilter } from '../notification/notification-list-relation-filter.input';
import { SectionListRelationFilter } from '../section/section-list-relation-filter.input';
import { CourseReviewListRelationFilter } from '../course-review/course-review-list-relation-filter.input';
import { RatingSummaryNullableRelationFilter } from '../rating-summary/rating-summary-nullable-relation-filter.input';
import { OrderItemListRelationFilter } from '../order-item/order-item-list-relation-filter.input';
import { CartItemListRelationFilter } from '../cart-item/cart-item-list-relation-filter.input';
import { UserLessonProgressListRelationFilter } from '../user-lesson-progress/user-lesson-progress-list-relation-filter.input';
import { UserQuizProgressListRelationFilter } from '../user-quiz-progress/user-quiz-progress-list-relation-filter.input';
import { ReportListRelationFilter } from '../report/report-list-relation-filter.input';
import { CourseViewListRelationFilter } from '../course-view/course-view-list-relation-filter.input';
import { DiscountVoucherItemListRelationFilter } from '../discount-voucher-item/discount-voucher-item-list-relation-filter.input';
import { QuizListRelationFilter } from '../quiz/quiz-list-relation-filter.input';

@InputType()
export class CourseWhereUniqueInput {

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:true})
    course_name?: string;

    @Field(() => [CourseWhereInput], {nullable:true})
    AND?: Array<CourseWhereInput>;

    @Field(() => [CourseWhereInput], {nullable:true})
    OR?: Array<CourseWhereInput>;

    @Field(() => [CourseWhereInput], {nullable:true})
    NOT?: Array<CourseWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    course_description?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    course_price?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    course_original_price?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    state?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    target?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    thumbnail?: StringNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    access_duration_months?: IntNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    access_type?: IntFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    access_expire_at?: DateTimeNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    view_count?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    created_by?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    updated_by?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    del_flg?: BoolFilter;

    @Field(() => UserCourseListRelationFilter, {nullable:true})
    user_courses?: UserCourseListRelationFilter;

    @Field(() => ComboCourseListRelationFilter, {nullable:true})
    combos?: ComboCourseListRelationFilter;

    @Field(() => CommentListRelationFilter, {nullable:true})
    comments?: CommentListRelationFilter;

    @Field(() => NotificationListRelationFilter, {nullable:true})
    notifications?: NotificationListRelationFilter;

    @Field(() => SectionListRelationFilter, {nullable:true})
    sections?: SectionListRelationFilter;

    @Field(() => CourseReviewListRelationFilter, {nullable:true})
    courseReviews?: CourseReviewListRelationFilter;

    @Field(() => RatingSummaryNullableRelationFilter, {nullable:true})
    ratingSummary?: RatingSummaryNullableRelationFilter;

    @Field(() => OrderItemListRelationFilter, {nullable:true})
    order_items?: OrderItemListRelationFilter;

    @Field(() => CartItemListRelationFilter, {nullable:true})
    cart_items?: CartItemListRelationFilter;

    @Field(() => UserLessonProgressListRelationFilter, {nullable:true})
    user_lesson_progress?: UserLessonProgressListRelationFilter;

    @Field(() => UserQuizProgressListRelationFilter, {nullable:true})
    user_quiz_progress?: UserQuizProgressListRelationFilter;

    @Field(() => ReportListRelationFilter, {nullable:true})
    reports?: ReportListRelationFilter;

    @Field(() => CourseViewListRelationFilter, {nullable:true})
    course_view?: CourseViewListRelationFilter;

    @Field(() => DiscountVoucherItemListRelationFilter, {nullable:true})
    discount_vouchers?: DiscountVoucherItemListRelationFilter;

    @Field(() => QuizListRelationFilter, {nullable:true})
    quizzes?: QuizListRelationFilter;
}
