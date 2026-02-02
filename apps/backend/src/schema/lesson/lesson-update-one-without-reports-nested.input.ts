import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutReportsInput } from './lesson-create-without-reports.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutReportsInput } from './lesson-create-or-connect-without-reports.input';
import { LessonUpsertWithoutReportsInput } from './lesson-upsert-without-reports.input';
import { LessonWhereInput } from './lesson-where.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { LessonUpdateToOneWithWhereWithoutReportsInput } from './lesson-update-to-one-with-where-without-reports.input';

@InputType()
export class LessonUpdateOneWithoutReportsNestedInput {

    @Field(() => LessonCreateWithoutReportsInput, {nullable:true})
    @Type(() => LessonCreateWithoutReportsInput)
    create?: LessonCreateWithoutReportsInput;

    @Field(() => LessonCreateOrConnectWithoutReportsInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutReportsInput)
    connectOrCreate?: LessonCreateOrConnectWithoutReportsInput;

    @Field(() => LessonUpsertWithoutReportsInput, {nullable:true})
    @Type(() => LessonUpsertWithoutReportsInput)
    upsert?: LessonUpsertWithoutReportsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    delete?: LessonWhereInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonUpdateToOneWithWhereWithoutReportsInput, {nullable:true})
    @Type(() => LessonUpdateToOneWithWhereWithoutReportsInput)
    update?: LessonUpdateToOneWithWhereWithoutReportsInput;
}
