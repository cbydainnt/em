import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutReportsInput } from './lesson-create-without-reports.input';

@InputType()
export class LessonCreateOrConnectWithoutReportsInput {

    @Field(() => LessonWhereUniqueInput, {nullable:false})
    @Type(() => LessonWhereUniqueInput)
    where!: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonCreateWithoutReportsInput, {nullable:false})
    @Type(() => LessonCreateWithoutReportsInput)
    create!: LessonCreateWithoutReportsInput;
}
