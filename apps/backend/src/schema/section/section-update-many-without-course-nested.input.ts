import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SectionCreateWithoutCourseInput } from './section-create-without-course.input';
import { Type } from 'class-transformer';
import { SectionCreateOrConnectWithoutCourseInput } from './section-create-or-connect-without-course.input';
import { SectionUpsertWithWhereUniqueWithoutCourseInput } from './section-upsert-with-where-unique-without-course.input';
import { SectionCreateManyCourseInputEnvelope } from './section-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { SectionWhereUniqueInput } from './section-where-unique.input';
import { SectionUpdateWithWhereUniqueWithoutCourseInput } from './section-update-with-where-unique-without-course.input';
import { SectionUpdateManyWithWhereWithoutCourseInput } from './section-update-many-with-where-without-course.input';
import { SectionScalarWhereInput } from './section-scalar-where.input';

@InputType()
export class SectionUpdateManyWithoutCourseNestedInput {

    @Field(() => [SectionCreateWithoutCourseInput], {nullable:true})
    @Type(() => SectionCreateWithoutCourseInput)
    create?: Array<SectionCreateWithoutCourseInput>;

    @Field(() => [SectionCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => SectionCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<SectionCreateOrConnectWithoutCourseInput>;

    @Field(() => [SectionUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => SectionUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<SectionUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => SectionCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => SectionCreateManyCourseInputEnvelope)
    createMany?: SectionCreateManyCourseInputEnvelope;

    @Field(() => [SectionWhereUniqueInput], {nullable:true})
    @Type(() => SectionWhereUniqueInput)
    set?: Array<Prisma.AtLeast<SectionWhereUniqueInput, 'section_id'>>;

    @Field(() => [SectionWhereUniqueInput], {nullable:true})
    @Type(() => SectionWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<SectionWhereUniqueInput, 'section_id'>>;

    @Field(() => [SectionWhereUniqueInput], {nullable:true})
    @Type(() => SectionWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<SectionWhereUniqueInput, 'section_id'>>;

    @Field(() => [SectionWhereUniqueInput], {nullable:true})
    @Type(() => SectionWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<SectionWhereUniqueInput, 'section_id'>>;

    @Field(() => [SectionUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => SectionUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<SectionUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [SectionUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => SectionUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<SectionUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [SectionScalarWhereInput], {nullable:true})
    @Type(() => SectionScalarWhereInput)
    deleteMany?: Array<SectionScalarWhereInput>;
}
