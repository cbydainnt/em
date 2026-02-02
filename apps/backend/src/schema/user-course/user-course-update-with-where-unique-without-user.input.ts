import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserCourseWhereUniqueInput } from './user-course-where-unique.input';
import { Type } from 'class-transformer';
import { UserCourseUpdateWithoutUserInput } from './user-course-update-without-user.input';

@InputType()
export class UserCourseUpdateWithWhereUniqueWithoutUserInput {

    @Field(() => UserCourseWhereUniqueInput, {nullable:false})
    @Type(() => UserCourseWhereUniqueInput)
    where!: Prisma.AtLeast<UserCourseWhereUniqueInput, 'id' | 'user_id_course_id'>;

    @Field(() => UserCourseUpdateWithoutUserInput, {nullable:false})
    @Type(() => UserCourseUpdateWithoutUserInput)
    data!: UserCourseUpdateWithoutUserInput;
}
