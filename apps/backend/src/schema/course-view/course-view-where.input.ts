import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { CourseRelationFilter } from '../course/course-relation-filter.input';
import { UserNullableRelationFilter } from '../user/user-nullable-relation-filter.input';

@InputType()
export class CourseViewWhereInput {

    @Field(() => [CourseViewWhereInput], {nullable:true})
    AND?: Array<CourseViewWhereInput>;

    @Field(() => [CourseViewWhereInput], {nullable:true})
    OR?: Array<CourseViewWhereInput>;

    @Field(() => [CourseViewWhereInput], {nullable:true})
    NOT?: Array<CourseViewWhereInput>;

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

    @Field(() => CourseRelationFilter, {nullable:true})
    course?: CourseRelationFilter;

    @Field(() => UserNullableRelationFilter, {nullable:true})
    user?: UserNullableRelationFilter;
}
