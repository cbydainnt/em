import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { Type } from 'class-transformer';
import { ReportCreateWithoutLessonInput } from './report-create-without-lesson.input';

@InputType()
export class ReportCreateOrConnectWithoutLessonInput {

    @Field(() => ReportWhereUniqueInput, {nullable:false})
    @Type(() => ReportWhereUniqueInput)
    where!: Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>;

    @Field(() => ReportCreateWithoutLessonInput, {nullable:false})
    @Type(() => ReportCreateWithoutLessonInput)
    create!: ReportCreateWithoutLessonInput;
}
