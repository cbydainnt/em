import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateWithoutLessonInput } from './report-create-without-lesson.input';
import { Type } from 'class-transformer';
import { ReportCreateOrConnectWithoutLessonInput } from './report-create-or-connect-without-lesson.input';
import { ReportCreateManyLessonInputEnvelope } from './report-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';

@InputType()
export class ReportCreateNestedManyWithoutLessonInput {

    @Field(() => [ReportCreateWithoutLessonInput], {nullable:true})
    @Type(() => ReportCreateWithoutLessonInput)
    create?: Array<ReportCreateWithoutLessonInput>;

    @Field(() => [ReportCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => ReportCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<ReportCreateOrConnectWithoutLessonInput>;

    @Field(() => ReportCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => ReportCreateManyLessonInputEnvelope)
    createMany?: ReportCreateManyLessonInputEnvelope;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;
}
