import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';

@InputType()
export class SectionScalarWhereInput {

    @Field(() => [SectionScalarWhereInput], {nullable:true})
    AND?: Array<SectionScalarWhereInput>;

    @Field(() => [SectionScalarWhereInput], {nullable:true})
    OR?: Array<SectionScalarWhereInput>;

    @Field(() => [SectionScalarWhereInput], {nullable:true})
    NOT?: Array<SectionScalarWhereInput>;

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
}
