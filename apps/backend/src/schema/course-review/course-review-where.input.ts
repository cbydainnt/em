import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { CourseRelationFilter } from '../course/course-relation-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';

@InputType()
export class CourseReviewWhereInput {

    @Field(() => [CourseReviewWhereInput], {nullable:true})
    AND?: Array<CourseReviewWhereInput>;

    @Field(() => [CourseReviewWhereInput], {nullable:true})
    OR?: Array<CourseReviewWhereInput>;

    @Field(() => [CourseReviewWhereInput], {nullable:true})
    NOT?: Array<CourseReviewWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    course_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    rating?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    comment?: StringNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => CourseRelationFilter, {nullable:true})
    course?: CourseRelationFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    user?: UserRelationFilter;
}
