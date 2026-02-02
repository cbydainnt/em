import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';

@InputType()
export class NoteScalarWhereInput {

    @Field(() => [NoteScalarWhereInput], {nullable:true})
    AND?: Array<NoteScalarWhereInput>;

    @Field(() => [NoteScalarWhereInput], {nullable:true})
    OR?: Array<NoteScalarWhereInput>;

    @Field(() => [NoteScalarWhereInput], {nullable:true})
    NOT?: Array<NoteScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    note_id?: StringFilter;

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
}
