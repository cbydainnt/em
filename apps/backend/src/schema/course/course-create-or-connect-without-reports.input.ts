import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutReportsInput } from './course-create-without-reports.input';

@InputType()
export class CourseCreateOrConnectWithoutReportsInput {

    @Field(() => CourseWhereUniqueInput, {nullable:false})
    @Type(() => CourseWhereUniqueInput)
    where!: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseCreateWithoutReportsInput, {nullable:false})
    @Type(() => CourseCreateWithoutReportsInput)
    create!: CourseCreateWithoutReportsInput;
}
