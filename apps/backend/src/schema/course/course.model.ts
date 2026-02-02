import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserCourse } from '../user-course/user-course.model';
import { ComboCourse } from '../combo-course/combo-course.model';
import { Comment } from '../comment/comment.model';
import { Notification } from '../notification/notification.model';
import { Section } from '../section/section.model';
import { CourseReview } from '../course-review/course-review.model';
import { RatingSummary } from '../rating-summary/rating-summary.model';
import { OrderItem } from '../order-item/order-item.model';
import { CartItem } from '../cart-item/cart-item.model';
import { UserLessonProgress } from '../user-lesson-progress/user-lesson-progress.model';
import { UserQuizProgress } from '../user-quiz-progress/user-quiz-progress.model';
import { Report } from '../report/report.model';
import { CourseView } from '../course-view/course-view.model';
import { DiscountVoucherItem } from '../discount-voucher-item/discount-voucher-item.model';
import { Quiz } from '../quiz/quiz.model';
import { CourseCount } from './course-count.output';

@ObjectType()
export class Course {

    @Field(() => ID, {nullable:false})
    course_id!: string;

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
    target!: string | null;

    @Field(() => String, {nullable:true})
    thumbnail!: string | null;

    @Field(() => Int, {nullable:true})
    access_duration_months!: number | null;

    @Field(() => Int, {nullable:false,defaultValue:1})
    access_type!: number;

    @Field(() => Date, {nullable:true})
    access_expire_at!: Date | null;

    @Field(() => Int, {nullable:false,defaultValue:0})
    view_count!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => String, {nullable:true})
    created_by!: string | null;

    @Field(() => String, {nullable:true})
    updated_by!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => [UserCourse], {nullable:true})
    user_courses?: Array<UserCourse>;

    @Field(() => [ComboCourse], {nullable:true})
    combos?: Array<ComboCourse>;

    @Field(() => [Comment], {nullable:true})
    comments?: Array<Comment>;

    @Field(() => [Notification], {nullable:true})
    notifications?: Array<Notification>;

    @Field(() => [Section], {nullable:true})
    sections?: Array<Section>;

    @Field(() => [CourseReview], {nullable:true})
    courseReviews?: Array<CourseReview>;

    @Field(() => RatingSummary, {nullable:true})
    ratingSummary?: RatingSummary | null;

    @Field(() => [OrderItem], {nullable:true})
    order_items?: Array<OrderItem>;

    @Field(() => [CartItem], {nullable:true})
    cart_items?: Array<CartItem>;

    @Field(() => [UserLessonProgress], {nullable:true})
    user_lesson_progress?: Array<UserLessonProgress>;

    @Field(() => [UserQuizProgress], {nullable:true})
    user_quiz_progress?: Array<UserQuizProgress>;

    @Field(() => [Report], {nullable:true})
    reports?: Array<Report>;

    @Field(() => [CourseView], {nullable:true})
    course_view?: Array<CourseView>;

    @Field(() => [DiscountVoucherItem], {nullable:true})
    discount_vouchers?: Array<DiscountVoucherItem>;

    @Field(() => [Quiz], {nullable:true})
    quizzes?: Array<Quiz>;

    @Field(() => CourseCount, {nullable:false})
    _count?: CourseCount;
}
