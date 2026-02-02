import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';

@InputType()
export class LessonScalarWhereInput {

    @Field(() => [LessonScalarWhereInput], {nullable:true})
    AND?: Array<LessonScalarWhereInput>;

    @Field(() => [LessonScalarWhereInput], {nullable:true})
    OR?: Array<LessonScalarWhereInput>;

    @Field(() => [LessonScalarWhereInput], {nullable:true})
    NOT?: Array<LessonScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    lesson_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    lesson_title?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    lesson_type?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    lesson_video?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    lesson_thumbnail?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    lesson_order?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    minutes?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    video_duration?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    access_type?: IntFilter;

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
    section_id?: StringFilter;
}
