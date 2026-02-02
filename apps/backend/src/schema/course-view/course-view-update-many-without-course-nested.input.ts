import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseViewCreateWithoutCourseInput } from './course-view-create-without-course.input';
import { Type } from 'class-transformer';
import { CourseViewCreateOrConnectWithoutCourseInput } from './course-view-create-or-connect-without-course.input';
import { CourseViewUpsertWithWhereUniqueWithoutCourseInput } from './course-view-upsert-with-where-unique-without-course.input';
import { CourseViewCreateManyCourseInputEnvelope } from './course-view-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CourseViewWhereUniqueInput } from './course-view-where-unique.input';
import { CourseViewUpdateWithWhereUniqueWithoutCourseInput } from './course-view-update-with-where-unique-without-course.input';
import { CourseViewUpdateManyWithWhereWithoutCourseInput } from './course-view-update-many-with-where-without-course.input';
import { CourseViewScalarWhereInput } from './course-view-scalar-where.input';

@InputType()
export class CourseViewUpdateManyWithoutCourseNestedInput {

    @Field(() => [CourseViewCreateWithoutCourseInput], {nullable:true})
    @Type(() => CourseViewCreateWithoutCourseInput)
    create?: Array<CourseViewCreateWithoutCourseInput>;

    @Field(() => [CourseViewCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => CourseViewCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<CourseViewCreateOrConnectWithoutCourseInput>;

    @Field(() => [CourseViewUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => CourseViewUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<CourseViewUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => CourseViewCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => CourseViewCreateManyCourseInputEnvelope)
    createMany?: CourseViewCreateManyCourseInputEnvelope;

    @Field(() => [CourseViewWhereUniqueInput], {nullable:true})
    @Type(() => CourseViewWhereUniqueInput)
    set?: Array<Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>>;

    @Field(() => [CourseViewWhereUniqueInput], {nullable:true})
    @Type(() => CourseViewWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>>;

    @Field(() => [CourseViewWhereUniqueInput], {nullable:true})
    @Type(() => CourseViewWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>>;

    @Field(() => [CourseViewWhereUniqueInput], {nullable:true})
    @Type(() => CourseViewWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>>;

    @Field(() => [CourseViewUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => CourseViewUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<CourseViewUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [CourseViewUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => CourseViewUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<CourseViewUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [CourseViewScalarWhereInput], {nullable:true})
    @Type(() => CourseViewScalarWhereInput)
    deleteMany?: Array<CourseViewScalarWhereInput>;
}
