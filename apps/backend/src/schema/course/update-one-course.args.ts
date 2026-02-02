import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseUpdateInput } from './course-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@ArgsType()
export class UpdateOneCourseArgs {

    @Field(() => CourseUpdateInput, {nullable:false})
    @Type(() => CourseUpdateInput)
    data!: CourseUpdateInput;

    @Field(() => CourseWhereUniqueInput, {nullable:false})
    @Type(() => CourseWhereUniqueInput)
    where!: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}
