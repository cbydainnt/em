import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class CourseReviewScalarWhereInput {

    @Field(() => [CourseReviewScalarWhereInput], {nullable:true})
    AND?: Array<CourseReviewScalarWhereInput>;

    @Field(() => [CourseReviewScalarWhereInput], {nullable:true})
    OR?: Array<CourseReviewScalarWhereInput>;

    @Field(() => [CourseReviewScalarWhereInput], {nullable:true})
    NOT?: Array<CourseReviewScalarWhereInput>;

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
}
