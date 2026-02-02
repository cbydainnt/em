import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentWhereInput } from './comment-where.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { CourseNullableRelationFilter } from '../course/course-nullable-relation-filter.input';
import { LessonNullableRelationFilter } from '../lesson/lesson-nullable-relation-filter.input';
import { UserNullableRelationFilter } from '../user/user-nullable-relation-filter.input';
import { CommentNullableRelationFilter } from './comment-nullable-relation-filter.input';
import { CommentListRelationFilter } from './comment-list-relation-filter.input';

@InputType()
export class CommentWhereUniqueInput {

    @Field(() => String, {nullable:true})
    comment_id?: string;

    @Field(() => String, {nullable:true})
    seed_tag?: string;

    @Field(() => [CommentWhereInput], {nullable:true})
    AND?: Array<CommentWhereInput>;

    @Field(() => [CommentWhereInput], {nullable:true})
    OR?: Array<CommentWhereInput>;

    @Field(() => [CommentWhereInput], {nullable:true})
    NOT?: Array<CommentWhereInput>;

    @Field(() => StringNullableFilter, {nullable:true})
    parent_id?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    content?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    image_url?: StringNullableFilter;

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

    @Field(() => BoolFilter, {nullable:true})
    is_hidden?: BoolFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    course_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    lesson_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    user_id?: StringNullableFilter;

    @Field(() => CourseNullableRelationFilter, {nullable:true})
    course?: CourseNullableRelationFilter;

    @Field(() => LessonNullableRelationFilter, {nullable:true})
    lesson?: LessonNullableRelationFilter;

    @Field(() => UserNullableRelationFilter, {nullable:true})
    user?: UserNullableRelationFilter;

    @Field(() => CommentNullableRelationFilter, {nullable:true})
    parent?: CommentNullableRelationFilter;

    @Field(() => CommentListRelationFilter, {nullable:true})
    replies?: CommentListRelationFilter;
}
