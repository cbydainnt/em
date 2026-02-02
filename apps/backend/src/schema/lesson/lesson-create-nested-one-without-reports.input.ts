import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutReportsInput } from './lesson-create-without-reports.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutReportsInput } from './lesson-create-or-connect-without-reports.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';

@InputType()
export class LessonCreateNestedOneWithoutReportsInput {

    @Field(() => LessonCreateWithoutReportsInput, {nullable:true})
    @Type(() => LessonCreateWithoutReportsInput)
    create?: LessonCreateWithoutReportsInput;

    @Field(() => LessonCreateOrConnectWithoutReportsInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutReportsInput)
    connectOrCreate?: LessonCreateOrConnectWithoutReportsInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;
}
