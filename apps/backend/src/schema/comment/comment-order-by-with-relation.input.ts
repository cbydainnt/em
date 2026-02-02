import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { CourseOrderByWithRelationInput } from '../course/course-order-by-with-relation.input';
import { LessonOrderByWithRelationInput } from '../lesson/lesson-order-by-with-relation.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { CommentOrderByRelationAggregateInput } from './comment-order-by-relation-aggregate.input';

@InputType()
export class CommentOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    comment_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    parent_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    content?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    image_url?: keyof typeof SortOrder;

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

    @Field(() => SortOrder, {nullable:true})
    is_hidden?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    seed_tag?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => CourseOrderByWithRelationInput, {nullable:true})
    course?: CourseOrderByWithRelationInput;

    @Field(() => LessonOrderByWithRelationInput, {nullable:true})
    lesson?: LessonOrderByWithRelationInput;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: UserOrderByWithRelationInput;

    @Field(() => CommentOrderByWithRelationInput, {nullable:true})
    parent?: CommentOrderByWithRelationInput;

    @Field(() => CommentOrderByRelationAggregateInput, {nullable:true})
    replies?: CommentOrderByRelationAggregateInput;
}
