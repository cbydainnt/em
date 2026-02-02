import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { CourseRelationFilter } from '../course/course-relation-filter.input';
import { LessonListRelationFilter } from '../lesson/lesson-list-relation-filter.input';

@InputType()
export class SectionWhereInput {

    @Field(() => [SectionWhereInput], {nullable:true})
    AND?: Array<SectionWhereInput>;

    @Field(() => [SectionWhereInput], {nullable:true})
    OR?: Array<SectionWhereInput>;

    @Field(() => [SectionWhereInput], {nullable:true})
    NOT?: Array<SectionWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    section_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    section_title?: StringFilter;

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

    @Field(() => StringFilter, {nullable:true})
    course_id?: StringFilter;

    @Field(() => CourseRelationFilter, {nullable:true})
    course?: CourseRelationFilter;

    @Field(() => LessonListRelationFilter, {nullable:true})
    lessons?: LessonListRelationFilter;
}
