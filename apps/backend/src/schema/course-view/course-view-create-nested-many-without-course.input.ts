import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseViewCreateWithoutCourseInput } from './course-view-create-without-course.input';
import { Type } from 'class-transformer';
import { CourseViewCreateOrConnectWithoutCourseInput } from './course-view-create-or-connect-without-course.input';
import { CourseViewCreateManyCourseInputEnvelope } from './course-view-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CourseViewWhereUniqueInput } from './course-view-where-unique.input';

@InputType()
export class CourseViewCreateNestedManyWithoutCourseInput {

    @Field(() => [CourseViewCreateWithoutCourseInput], {nullable:true})
    @Type(() => CourseViewCreateWithoutCourseInput)
    create?: Array<CourseViewCreateWithoutCourseInput>;

    @Field(() => [CourseViewCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => CourseViewCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<CourseViewCreateOrConnectWithoutCourseInput>;

    @Field(() => CourseViewCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => CourseViewCreateManyCourseInputEnvelope)
    createMany?: CourseViewCreateManyCourseInputEnvelope;

    @Field(() => [CourseViewWhereUniqueInput], {nullable:true})
    @Type(() => CourseViewWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>>;
}
