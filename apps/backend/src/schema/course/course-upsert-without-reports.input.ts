import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutReportsInput } from './course-update-without-reports.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutReportsInput } from './course-create-without-reports.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutReportsInput {

    @Field(() => CourseUpdateWithoutReportsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutReportsInput)
    update!: CourseUpdateWithoutReportsInput;

    @Field(() => CourseCreateWithoutReportsInput, {nullable:false})
    @Type(() => CourseCreateWithoutReportsInput)
    create!: CourseCreateWithoutReportsInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
