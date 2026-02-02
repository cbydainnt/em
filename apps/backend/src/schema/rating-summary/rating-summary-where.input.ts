import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { CourseRelationFilter } from '../course/course-relation-filter.input';

@InputType()
export class RatingSummaryWhereInput {

    @Field(() => [RatingSummaryWhereInput], {nullable:true})
    AND?: Array<RatingSummaryWhereInput>;

    @Field(() => [RatingSummaryWhereInput], {nullable:true})
    OR?: Array<RatingSummaryWhereInput>;

    @Field(() => [RatingSummaryWhereInput], {nullable:true})
    NOT?: Array<RatingSummaryWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    course_id?: StringFilter;

    @Field(() => FloatFilter, {nullable:true})
    avg_rating?: FloatFilter;

    @Field(() => IntFilter, {nullable:true})
    total_reviews?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    rating_1_count?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    rating_2_count?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    rating_3_count?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    rating_4_count?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    rating_5_count?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => CourseRelationFilter, {nullable:true})
    course?: CourseRelationFilter;
}
