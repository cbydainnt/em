import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserCourseUpdateInput } from './user-course-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { UserCourseWhereUniqueInput } from './user-course-where-unique.input';

@ArgsType()
export class UpdateOneUserCourseArgs {

    @Field(() => UserCourseUpdateInput, {nullable:false})
    @Type(() => UserCourseUpdateInput)
    data!: UserCourseUpdateInput;

    @Field(() => UserCourseWhereUniqueInput, {nullable:false})
    @Type(() => UserCourseWhereUniqueInput)
    where!: Prisma.AtLeast<UserCourseWhereUniqueInput, 'id' | 'user_id_course_id'>;
}
