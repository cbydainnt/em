import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ComboCourseWhereUniqueInput } from './combo-course-where-unique.input';
import { Type } from 'class-transformer';
import { ComboCourseCreateWithoutCourseInput } from './combo-course-create-without-course.input';

@InputType()
export class ComboCourseCreateOrConnectWithoutCourseInput {

    @Field(() => ComboCourseWhereUniqueInput, {nullable:false})
    @Type(() => ComboCourseWhereUniqueInput)
    where!: Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>;

    @Field(() => ComboCourseCreateWithoutCourseInput, {nullable:false})
    @Type(() => ComboCourseCreateWithoutCourseInput)
    create!: ComboCourseCreateWithoutCourseInput;
}
