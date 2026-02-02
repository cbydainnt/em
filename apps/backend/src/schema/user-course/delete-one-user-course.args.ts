import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserCourseWhereUniqueInput } from './user-course-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneUserCourseArgs {

    @Field(() => UserCourseWhereUniqueInput, {nullable:false})
    @Type(() => UserCourseWhereUniqueInput)
    where!: Prisma.AtLeast<UserCourseWhereUniqueInput, 'id' | 'user_id_course_id'>;
}
