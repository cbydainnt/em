import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class CourseViewScalarWhereInput {

    @Field(() => [CourseViewScalarWhereInput], {nullable:true})
    AND?: Array<CourseViewScalarWhereInput>;

    @Field(() => [CourseViewScalarWhereInput], {nullable:true})
    OR?: Array<CourseViewScalarWhereInput>;

    @Field(() => [CourseViewScalarWhereInput], {nullable:true})
    NOT?: Array<CourseViewScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    course_id?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    user_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    ip_address?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    user_agent?: StringNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;
}
