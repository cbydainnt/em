import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonUpdateWithoutReportsInput } from './lesson-update-without-reports.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutReportsInput } from './lesson-create-without-reports.input';
import { LessonWhereInput } from './lesson-where.input';

@InputType()
export class LessonUpsertWithoutReportsInput {

    @Field(() => LessonUpdateWithoutReportsInput, {nullable:false})
    @Type(() => LessonUpdateWithoutReportsInput)
    update!: LessonUpdateWithoutReportsInput;

    @Field(() => LessonCreateWithoutReportsInput, {nullable:false})
    @Type(() => LessonCreateWithoutReportsInput)
    create!: LessonCreateWithoutReportsInput;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;
}
