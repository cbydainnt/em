import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUncheckedCreateNestedManyWithoutCreated_byInput } from './user-unchecked-create-nested-many-without-created-by.input';
import { UserUncheckedCreateNestedManyWithoutUpdated_byInput } from './user-unchecked-create-nested-many-without-updated-by.input';
import { UserUncheckedCreateNestedManyWithoutDeleted_byInput } from './user-unchecked-create-nested-many-without-deleted-by.input';
import { NotificationUncheckedCreateNestedManyWithoutUserInput } from '../notification/notification-unchecked-create-nested-many-without-user.input';
import { UserCourseUncheckedCreateNestedManyWithoutUserInput } from '../user-course/user-course-unchecked-create-nested-many-without-user.input';
import { CommentUncheckedCreateNestedManyWithoutUserInput } from '../comment/comment-unchecked-create-nested-many-without-user.input';
import { CourseReviewUncheckedCreateNestedManyWithoutUserInput } from '../course-review/course-review-unchecked-create-nested-many-without-user.input';
import { OrderUncheckedCreateNestedManyWithoutUserInput } from '../order/order-unchecked-create-nested-many-without-user.input';
import { DiscountVoucherUsageUncheckedCreateNestedManyWithoutUserInput } from '../discount-voucher-usage/discount-voucher-usage-unchecked-create-nested-many-without-user.input';
import { CartItemUncheckedCreateNestedManyWithoutUserInput } from '../cart-item/cart-item-unchecked-create-nested-many-without-user.input';
import { UserLessonProgressUncheckedCreateNestedManyWithoutUserInput } from '../user-lesson-progress/user-lesson-progress-unchecked-create-nested-many-without-user.input';
import { NoteUncheckedCreateNestedManyWithoutUserInput } from '../note/note-unchecked-create-nested-many-without-user.input';
import { ReportUncheckedCreateNestedManyWithoutUserInput } from '../report/report-unchecked-create-nested-many-without-user.input';
import { ReportCommentUncheckedCreateNestedManyWithoutUserInput } from '../report-comment/report-comment-unchecked-create-nested-many-without-user.input';
import { ReportUncheckedCreateNestedManyWithoutResolverInput } from '../report/report-unchecked-create-nested-many-without-resolver.input';
import { UserQuizProgressUncheckedCreateNestedManyWithoutUserInput } from '../user-quiz-progress/user-quiz-progress-unchecked-create-nested-many-without-user.input';
import { DiscountVoucherUserUncheckedCreateNestedManyWithoutUserInput } from '../discount-voucher-user/discount-voucher-user-unchecked-create-nested-many-without-user.input';
import { CourseViewUncheckedCreateNestedManyWithoutUserInput } from '../course-view/course-view-unchecked-create-nested-many-without-user.input';

@InputType()
export class UserUncheckedCreateWithoutUserNotificationsInput {

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

    @Field(() => String, {nullable:true})
    created_by_id?: string;

    @Field(() => String, {nullable:true})
    updated_by_id?: string;

    @Field(() => String, {nullable:true})
    deleted_by_id?: string;

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

    @Field(() => UserUncheckedCreateNestedManyWithoutCreated_byInput, {nullable:true})
    createds?: UserUncheckedCreateNestedManyWithoutCreated_byInput;

    @Field(() => UserUncheckedCreateNestedManyWithoutUpdated_byInput, {nullable:true})
    updateds?: UserUncheckedCreateNestedManyWithoutUpdated_byInput;

    @Field(() => UserUncheckedCreateNestedManyWithoutDeleted_byInput, {nullable:true})
    deleteds?: UserUncheckedCreateNestedManyWithoutDeleted_byInput;

    @Field(() => NotificationUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => UserCourseUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    user_courses?: UserCourseUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => CommentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => CourseReviewUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    courseReviews?: CourseReviewUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => OrderUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => DiscountVoucherUsageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    discount_vouchers?: DiscountVoucherUsageUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => CartItemUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    cartItems?: CartItemUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => UserLessonProgressUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => NoteUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    notes?: NoteUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => ReportUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => ReportCommentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    reportComments?: ReportCommentUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => ReportUncheckedCreateNestedManyWithoutResolverInput, {nullable:true})
    resolved_reports?: ReportUncheckedCreateNestedManyWithoutResolverInput;

    @Field(() => UserQuizProgressUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    quiz_progress?: UserQuizProgressUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => DiscountVoucherUserUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    allowed_discount_vouchers?: DiscountVoucherUserUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => CourseViewUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    course_view?: CourseViewUncheckedCreateNestedManyWithoutUserInput;
}
