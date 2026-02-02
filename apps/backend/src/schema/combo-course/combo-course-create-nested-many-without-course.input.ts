import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCourseCreateWithoutCourseInput } from './combo-course-create-without-course.input';
import { Type } from 'class-transformer';
import { ComboCourseCreateOrConnectWithoutCourseInput } from './combo-course-create-or-connect-without-course.input';
import { ComboCourseCreateManyCourseInputEnvelope } from './combo-course-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ComboCourseWhereUniqueInput } from './combo-course-where-unique.input';

@InputType()
export class ComboCourseCreateNestedManyWithoutCourseInput {

    @Field(() => [ComboCourseCreateWithoutCourseInput], {nullable:true})
    @Type(() => ComboCourseCreateWithoutCourseInput)
    create?: Array<ComboCourseCreateWithoutCourseInput>;

    @Field(() => [ComboCourseCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => ComboCourseCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<ComboCourseCreateOrConnectWithoutCourseInput>;

    @Field(() => ComboCourseCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => ComboCourseCreateManyCourseInputEnvelope)
    createMany?: ComboCourseCreateManyCourseInputEnvelope;

    @Field(() => [ComboCourseWhereUniqueInput], {nullable:true})
    @Type(() => ComboCourseWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>>;
}
