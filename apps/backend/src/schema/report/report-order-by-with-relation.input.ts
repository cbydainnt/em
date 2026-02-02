import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { CourseOrderByWithRelationInput } from '../course/course-order-by-with-relation.input';
import { LessonOrderByWithRelationInput } from '../lesson/lesson-order-by-with-relation.input';
import { ReportCommentOrderByRelationAggregateInput } from '../report-comment/report-comment-order-by-relation-aggregate.input';

@InputType()
export class ReportOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    report_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    report_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    category?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    description?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    screenshot_urls?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    priority?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    resolved_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    resolved_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    resolution_notes?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    is_anonymous?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    allow_contact?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: UserOrderByWithRelationInput;

    @Field(() => CourseOrderByWithRelationInput, {nullable:true})
    course?: CourseOrderByWithRelationInput;

    @Field(() => LessonOrderByWithRelationInput, {nullable:true})
    lesson?: LessonOrderByWithRelationInput;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    resolver?: UserOrderByWithRelationInput;

    @Field(() => ReportCommentOrderByRelationAggregateInput, {nullable:true})
    comments?: ReportCommentOrderByRelationAggregateInput;
}
