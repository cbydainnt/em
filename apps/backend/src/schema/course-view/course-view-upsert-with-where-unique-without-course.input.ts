import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseViewWhereUniqueInput } from './course-view-where-unique.input';
import { Type } from 'class-transformer';
import { CourseViewUpdateWithoutCourseInput } from './course-view-update-without-course.input';
import { CourseViewCreateWithoutCourseInput } from './course-view-create-without-course.input';

@InputType()
export class CourseViewUpsertWithWhereUniqueWithoutCourseInput {

    @Field(() => CourseViewWhereUniqueInput, {nullable:false})
    @Type(() => CourseViewWhereUniqueInput)
    where!: Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>;

    @Field(() => CourseViewUpdateWithoutCourseInput, {nullable:false})
    @Type(() => CourseViewUpdateWithoutCourseInput)
    update!: CourseViewUpdateWithoutCourseInput;

    @Field(() => CourseViewCreateWithoutCourseInput, {nullable:false})
    @Type(() => CourseViewCreateWithoutCourseInput)
    create!: CourseViewCreateWithoutCourseInput;
}
