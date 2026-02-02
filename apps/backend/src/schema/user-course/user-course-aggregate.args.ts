import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserCourseWhereInput } from './user-course-where.input';
import { Type } from 'class-transformer';
import { UserCourseOrderByWithRelationInput } from './user-course-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { UserCourseWhereUniqueInput } from './user-course-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UserCourseCountAggregateInput } from './user-course-count-aggregate.input';
import { UserCourseAvgAggregateInput } from './user-course-avg-aggregate.input';
import { UserCourseSumAggregateInput } from './user-course-sum-aggregate.input';
import { UserCourseMinAggregateInput } from './user-course-min-aggregate.input';
import { UserCourseMaxAggregateInput } from './user-course-max-aggregate.input';

@ArgsType()
export class UserCourseAggregateArgs {

    @Field(() => UserCourseWhereInput, {nullable:true})
    @Type(() => UserCourseWhereInput)
    where?: UserCourseWhereInput;

    @Field(() => [UserCourseOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserCourseOrderByWithRelationInput>;

    @Field(() => UserCourseWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserCourseWhereUniqueInput, 'id' | 'user_id_course_id'>;

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
