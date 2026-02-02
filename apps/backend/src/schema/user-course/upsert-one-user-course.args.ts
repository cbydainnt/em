import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserCourseWhereUniqueInput } from './user-course-where-unique.input';
import { Type } from 'class-transformer';
import { UserCourseCreateInput } from './user-course-create.input';
import { UserCourseUpdateInput } from './user-course-update.input';

@ArgsType()
export class UpsertOneUserCourseArgs {

    @Field(() => UserCourseWhereUniqueInput, {nullable:false})
    @Type(() => UserCourseWhereUniqueInput)
    where!: Prisma.AtLeast<UserCourseWhereUniqueInput, 'id' | 'user_id_course_id'>;

    @Field(() => UserCourseCreateInput, {nullable:false})
    @Type(() => UserCourseCreateInput)
    create!: UserCourseCreateInput;

    @Field(() => UserCourseUpdateInput, {nullable:false})
    @Type(() => UserCourseUpdateInput)
    update!: UserCourseUpdateInput;
}
