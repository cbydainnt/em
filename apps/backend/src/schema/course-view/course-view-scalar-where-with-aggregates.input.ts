import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class CourseViewScalarWhereWithAggregatesInput {

    @Field(() => [CourseViewScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<CourseViewScalarWhereWithAggregatesInput>;

    @Field(() => [CourseViewScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<CourseViewScalarWhereWithAggregatesInput>;

    @Field(() => [CourseViewScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<CourseViewScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    course_id?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    user_id?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    ip_address?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    user_agent?: StringNullableWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    created_at?: DateTimeWithAggregatesFilter;
}
