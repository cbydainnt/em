import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutCombosInput } from './course-update-without-combos.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutCombosInput } from './course-create-without-combos.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutCombosInput {

    @Field(() => CourseUpdateWithoutCombosInput, {nullable:false})
    @Type(() => CourseUpdateWithoutCombosInput)
    update!: CourseUpdateWithoutCombosInput;

    @Field(() => CourseCreateWithoutCombosInput, {nullable:false})
    @Type(() => CourseCreateWithoutCombosInput)
    create!: CourseCreateWithoutCombosInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
