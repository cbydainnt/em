import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserCourseWhereInput } from './user-course-where.input';
import { Type } from 'class-transformer';
import { UserCourseOrderByWithAggregationInput } from './user-course-order-by-with-aggregation.input';
import { UserCourseScalarFieldEnum } from './user-course-scalar-field.enum';
import { UserCourseScalarWhereWithAggregatesInput } from './user-course-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { UserCourseCountAggregateInput } from './user-course-count-aggregate.input';
import { UserCourseAvgAggregateInput } from './user-course-avg-aggregate.input';
import { UserCourseSumAggregateInput } from './user-course-sum-aggregate.input';
import { UserCourseMinAggregateInput } from './user-course-min-aggregate.input';
import { UserCourseMaxAggregateInput } from './user-course-max-aggregate.input';

@ArgsType()
export class UserCourseGroupByArgs {

    @Field(() => UserCourseWhereInput, {nullable:true})
    @Type(() => UserCourseWhereInput)
    where?: UserCourseWhereInput;

    @Field(() => [UserCourseOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<UserCourseOrderByWithAggregationInput>;

    @Field(() => [UserCourseScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof UserCourseScalarFieldEnum>;

    @Field(() => UserCourseScalarWhereWithAggregatesInput, {nullable:true})
    having?: UserCourseScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => UserCourseCountAggregateInput, {nullable:true})
    _count?: UserCourseCountAggregateInput;

    @Field(() => UserCourseAvgAggregateInput, {nullable:true})
    _avg?: UserCourseAvgAggregateInput;

    @Field(() => UserCourseSumAggregateInput, {nullable:true})
    _sum?: UserCourseSumAggregateInput;

    @Field(() => UserCourseMinAggregateInput, {nullable:true})
    _min?: UserCourseMinAggregateInput;

    @Field(() => UserCourseMaxAggregateInput, {nullable:true})
    _max?: UserCourseMaxAggregateInput;
}
