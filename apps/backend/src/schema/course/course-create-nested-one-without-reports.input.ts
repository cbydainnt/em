import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutReportsInput } from './course-create-without-reports.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutReportsInput } from './course-create-or-connect-without-reports.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutReportsInput {

    @Field(() => CourseCreateWithoutReportsInput, {nullable:true})
    @Type(() => CourseCreateWithoutReportsInput)
    create?: CourseCreateWithoutReportsInput;

    @Field(() => CourseCreateOrConnectWithoutReportsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutReportsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutReportsInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}
