import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { CourseOrderByWithRelationInput } from '../course/course-order-by-with-relation.input';
import { LessonOrderByRelationAggregateInput } from '../lesson/lesson-order-by-relation-aggregate.input';

@InputType()
export class SectionOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    section_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    section_title?: keyof typeof SortOrder;

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
    course_id?: keyof typeof SortOrder;

    @Field(() => CourseOrderByWithRelationInput, {nullable:true})
    course?: CourseOrderByWithRelationInput;

    @Field(() => LessonOrderByRelationAggregateInput, {nullable:true})
    lessons?: LessonOrderByRelationAggregateInput;
}
