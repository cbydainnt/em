import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateWithoutLessonInput } from './report-create-without-lesson.input';
import { Type } from 'class-transformer';
import { ReportCreateOrConnectWithoutLessonInput } from './report-create-or-connect-without-lesson.input';
import { ReportUpsertWithWhereUniqueWithoutLessonInput } from './report-upsert-with-where-unique-without-lesson.input';
import { ReportCreateManyLessonInputEnvelope } from './report-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { ReportUpdateWithWhereUniqueWithoutLessonInput } from './report-update-with-where-unique-without-lesson.input';
import { ReportUpdateManyWithWhereWithoutLessonInput } from './report-update-many-with-where-without-lesson.input';
import { ReportScalarWhereInput } from './report-scalar-where.input';

@InputType()
export class ReportUpdateManyWithoutLessonNestedInput {

    @Field(() => [ReportCreateWithoutLessonInput], {nullable:true})
    @Type(() => ReportCreateWithoutLessonInput)
    create?: Array<ReportCreateWithoutLessonInput>;

    @Field(() => [ReportCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => ReportCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<ReportCreateOrConnectWithoutLessonInput>;

    @Field(() => [ReportUpsertWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => ReportUpsertWithWhereUniqueWithoutLessonInput)
    upsert?: Array<ReportUpsertWithWhereUniqueWithoutLessonInput>;

    @Field(() => ReportCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => ReportCreateManyLessonInputEnvelope)
    createMany?: ReportCreateManyLessonInputEnvelope;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;

    @Field(() => [ReportUpdateWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => ReportUpdateWithWhereUniqueWithoutLessonInput)
    update?: Array<ReportUpdateWithWhereUniqueWithoutLessonInput>;

    @Field(() => [ReportUpdateManyWithWhereWithoutLessonInput], {nullable:true})
    @Type(() => ReportUpdateManyWithWhereWithoutLessonInput)
    updateMany?: Array<ReportUpdateManyWithWhereWithoutLessonInput>;

    @Field(() => [ReportScalarWhereInput], {nullable:true})
    @Type(() => ReportScalarWhereInput)
    deleteMany?: Array<ReportScalarWhereInput>;
}
