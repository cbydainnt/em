import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ComboCourseWhereUniqueInput } from './combo-course-where-unique.input';
import { Type } from 'class-transformer';
import { ComboCourseUpdateWithoutCourseInput } from './combo-course-update-without-course.input';

@InputType()
export class ComboCourseUpdateWithWhereUniqueWithoutCourseInput {

    @Field(() => ComboCourseWhereUniqueInput, {nullable:false})
    @Type(() => ComboCourseWhereUniqueInput)
    where!: Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>;

    @Field(() => ComboCourseUpdateWithoutCourseInput, {nullable:false})
    @Type(() => ComboCourseUpdateWithoutCourseInput)
    data!: ComboCourseUpdateWithoutCourseInput;
}
