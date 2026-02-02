import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { Type } from 'class-transformer';
import { ReportUpdateWithoutLessonInput } from './report-update-without-lesson.input';
import { ReportCreateWithoutLessonInput } from './report-create-without-lesson.input';

@InputType()
export class ReportUpsertWithWhereUniqueWithoutLessonInput {

    @Field(() => ReportWhereUniqueInput, {nullable:false})
    @Type(() => ReportWhereUniqueInput)
    where!: Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>;

    @Field(() => ReportUpdateWithoutLessonInput, {nullable:false})
    @Type(() => ReportUpdateWithoutLessonInput)
    update!: ReportUpdateWithoutLessonInput;

    @Field(() => ReportCreateWithoutLessonInput, {nullable:false})
    @Type(() => ReportCreateWithoutLessonInput)
    create!: ReportCreateWithoutLessonInput;
}
