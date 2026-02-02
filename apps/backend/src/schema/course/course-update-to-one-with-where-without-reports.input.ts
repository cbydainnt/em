import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutReportsInput } from './course-update-without-reports.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutReportsInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutReportsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutReportsInput)
    data!: CourseUpdateWithoutReportsInput;
}
