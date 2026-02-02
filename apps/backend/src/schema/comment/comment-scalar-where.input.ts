import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';

@InputType()
export class CommentScalarWhereInput {

    @Field(() => [CommentScalarWhereInput], {nullable:true})
    AND?: Array<CommentScalarWhereInput>;

    @Field(() => [CommentScalarWhereInput], {nullable:true})
    OR?: Array<CommentScalarWhereInput>;

    @Field(() => [CommentScalarWhereInput], {nullable:true})
    NOT?: Array<CommentScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    comment_id?: StringFilter;

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
    seed_tag?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    course_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    lesson_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    user_id?: StringNullableFilter;
}
