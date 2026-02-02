import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCourseCreateWithoutCourseInput } from './combo-course-create-without-course.input';
import { Type } from 'class-transformer';
import { ComboCourseCreateOrConnectWithoutCourseInput } from './combo-course-create-or-connect-without-course.input';
import { ComboCourseUpsertWithWhereUniqueWithoutCourseInput } from './combo-course-upsert-with-where-unique-without-course.input';
import { ComboCourseCreateManyCourseInputEnvelope } from './combo-course-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ComboCourseWhereUniqueInput } from './combo-course-where-unique.input';
import { ComboCourseUpdateWithWhereUniqueWithoutCourseInput } from './combo-course-update-with-where-unique-without-course.input';
import { ComboCourseUpdateManyWithWhereWithoutCourseInput } from './combo-course-update-many-with-where-without-course.input';
import { ComboCourseScalarWhereInput } from './combo-course-scalar-where.input';

@InputType()
export class ComboCourseUncheckedUpdateManyWithoutCourseNestedInput {

    @Field(() => [ComboCourseCreateWithoutCourseInput], {nullable:true})
    @Type(() => ComboCourseCreateWithoutCourseInput)
    create?: Array<ComboCourseCreateWithoutCourseInput>;

    @Field(() => [ComboCourseCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => ComboCourseCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<ComboCourseCreateOrConnectWithoutCourseInput>;

    @Field(() => [ComboCourseUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => ComboCourseUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<ComboCourseUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => ComboCourseCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => ComboCourseCreateManyCourseInputEnvelope)
    createMany?: ComboCourseCreateManyCourseInputEnvelope;

    @Field(() => [ComboCourseWhereUniqueInput], {nullable:true})
    @Type(() => ComboCourseWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>>;

    @Field(() => [ComboCourseWhereUniqueInput], {nullable:true})
    @Type(() => ComboCourseWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>>;

    @Field(() => [ComboCourseWhereUniqueInput], {nullable:true})
    @Type(() => ComboCourseWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>>;

    @Field(() => [ComboCourseWhereUniqueInput], {nullable:true})
    @Type(() => ComboCourseWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>>;

    @Field(() => [ComboCourseUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => ComboCourseUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<ComboCourseUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [ComboCourseUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => ComboCourseUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<ComboCourseUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [ComboCourseScalarWhereInput], {nullable:true})
    @Type(() => ComboCourseScalarWhereInput)
    deleteMany?: Array<ComboCourseScalarWhereInput>;
}
