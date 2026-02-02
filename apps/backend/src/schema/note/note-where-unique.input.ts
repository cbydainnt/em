import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NoteWhereInput } from './note-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { LessonRelationFilter } from '../lesson/lesson-relation-filter.input';

@InputType()
export class NoteWhereUniqueInput {

    @Field(() => String, {nullable:true})
    note_id?: string;

    @Field(() => [NoteWhereInput], {nullable:true})
    AND?: Array<NoteWhereInput>;

    @Field(() => [NoteWhereInput], {nullable:true})
    OR?: Array<NoteWhereInput>;

    @Field(() => [NoteWhereInput], {nullable:true})
    NOT?: Array<NoteWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    content?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    timestamp?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    lesson_id?: StringFilter;

    @Field(() => BoolFilter, {nullable:true})
    del_flg?: BoolFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    background_color?: StringNullableFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    user?: UserRelationFilter;

    @Field(() => LessonRelationFilter, {nullable:true})
    lesson?: LessonRelationFilter;
}
