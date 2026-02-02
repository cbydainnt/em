import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutCombosInput } from './course-update-without-combos.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutCombosInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutCombosInput, {nullable:false})
    @Type(() => CourseUpdateWithoutCombosInput)
    data!: CourseUpdateWithoutCombosInput;
}
