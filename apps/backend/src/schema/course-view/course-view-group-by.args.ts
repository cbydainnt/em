import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseViewWhereInput } from './course-view-where.input';
import { Type } from 'class-transformer';
import { CourseViewOrderByWithAggregationInput } from './course-view-order-by-with-aggregation.input';
import { CourseViewScalarFieldEnum } from './course-view-scalar-field.enum';
import { CourseViewScalarWhereWithAggregatesInput } from './course-view-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { CourseViewCountAggregateInput } from './course-view-count-aggregate.input';
import { CourseViewMinAggregateInput } from './course-view-min-aggregate.input';
import { CourseViewMaxAggregateInput } from './course-view-max-aggregate.input';

@ArgsType()
export class CourseViewGroupByArgs {

    @Field(() => CourseViewWhereInput, {nullable:true})
    @Type(() => CourseViewWhereInput)
    where?: CourseViewWhereInput;

    @Field(() => [CourseViewOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<CourseViewOrderByWithAggregationInput>;

    @Field(() => [CourseViewScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof CourseViewScalarFieldEnum>;

    @Field(() => CourseViewScalarWhereWithAggregatesInput, {nullable:true})
    having?: CourseViewScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => CourseViewCountAggregateInput, {nullable:true})
    _count?: CourseViewCountAggregateInput;

    @Field(() => CourseViewMinAggregateInput, {nullable:true})
    _min?: CourseViewMinAggregateInput;

    @Field(() => CourseViewMaxAggregateInput, {nullable:true})
    _max?: CourseViewMaxAggregateInput;
}
