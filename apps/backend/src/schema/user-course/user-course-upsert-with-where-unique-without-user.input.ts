import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserCourseWhereUniqueInput } from './user-course-where-unique.input';
import { Type } from 'class-transformer';
import { UserCourseUpdateWithoutUserInput } from './user-course-update-without-user.input';
import { UserCourseCreateWithoutUserInput } from './user-course-create-without-user.input';

@InputType()
export class UserCourseUpsertWithWhereUniqueWithoutUserInput {

    @Field(() => UserCourseWhereUniqueInput, {nullable:false})
    @Type(() => UserCourseWhereUniqueInput)
    where!: Prisma.AtLeast<UserCourseWhereUniqueInput, 'id' | 'user_id_course_id'>;

    @Field(() => UserCourseUpdateWithoutUserInput, {nullable:false})
    @Type(() => UserCourseUpdateWithoutUserInput)
    update!: UserCourseUpdateWithoutUserInput;

    @Field(() => UserCourseCreateWithoutUserInput, {nullable:false})
    @Type(() => UserCourseCreateWithoutUserInput)
    create!: UserCourseCreateWithoutUserInput;
}
