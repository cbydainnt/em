import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SectionCreateWithoutCourseInput } from './section-create-without-course.input';
import { Type } from 'class-transformer';
import { SectionCreateOrConnectWithoutCourseInput } from './section-create-or-connect-without-course.input';
import { SectionCreateManyCourseInputEnvelope } from './section-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { SectionWhereUniqueInput } from './section-where-unique.input';

@InputType()
export class SectionCreateNestedManyWithoutCourseInput {

    @Field(() => [SectionCreateWithoutCourseInput], {nullable:true})
    @Type(() => SectionCreateWithoutCourseInput)
    create?: Array<SectionCreateWithoutCourseInput>;

    @Field(() => [SectionCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => SectionCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<SectionCreateOrConnectWithoutCourseInput>;

    @Field(() => SectionCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => SectionCreateManyCourseInputEnvelope)
    createMany?: SectionCreateManyCourseInputEnvelope;

    @Field(() => [SectionWhereUniqueInput], {nullable:true})
    @Type(() => SectionWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<SectionWhereUniqueInput, 'section_id'>>;
}
