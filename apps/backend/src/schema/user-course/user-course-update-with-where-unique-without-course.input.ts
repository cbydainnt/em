import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserCourseWhereUniqueInput } from './user-course-where-unique.input';
import { Type } from 'class-transformer';
import { UserCourseUpdateWithoutCourseInput } from './user-course-update-without-course.input';

@InputType()
export class UserCourseUpdateWithWhereUniqueWithoutCourseInput {

    @Field(() => UserCourseWhereUniqueInput, {nullable:false})
    @Type(() => UserCourseWhereUniqueInput)
    where!: Prisma.AtLeast<UserCourseWhereUniqueInput, 'id' | 'user_id_course_id'>;

    @Field(() => UserCourseUpdateWithoutCourseInput, {nullable:false})
    @Type(() => UserCourseUpdateWithoutCourseInput)
    data!: UserCourseUpdateWithoutCourseInput;
}
