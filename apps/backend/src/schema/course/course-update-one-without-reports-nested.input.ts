import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutReportsInput } from './course-create-without-reports.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutReportsInput } from './course-create-or-connect-without-reports.input';
import { CourseUpsertWithoutReportsInput } from './course-upsert-without-reports.input';
import { CourseWhereInput } from './course-where.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutReportsInput } from './course-update-to-one-with-where-without-reports.input';

@InputType()
export class CourseUpdateOneWithoutReportsNestedInput {

    @Field(() => CourseCreateWithoutReportsInput, {nullable:true})
    @Type(() => CourseCreateWithoutReportsInput)
    create?: CourseCreateWithoutReportsInput;

    @Field(() => CourseCreateOrConnectWithoutReportsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutReportsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutReportsInput;

    @Field(() => CourseUpsertWithoutReportsInput, {nullable:true})
    @Type(() => CourseUpsertWithoutReportsInput)
    upsert?: CourseUpsertWithoutReportsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    delete?: CourseWhereInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutReportsInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutReportsInput)
    update?: CourseUpdateToOneWithWhereWithoutReportsInput;
}
