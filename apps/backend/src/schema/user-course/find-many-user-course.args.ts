import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserCourseWhereInput } from './user-course-where.input';
import { Type } from 'class-transformer';
import { UserCourseOrderByWithRelationInput } from './user-course-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { UserCourseWhereUniqueInput } from './user-course-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UserCourseScalarFieldEnum } from './user-course-scalar-field.enum';

@ArgsType()
export class FindManyUserCourseArgs {

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

    @Field(() => [UserCourseScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof UserCourseScalarFieldEnum>;
}
