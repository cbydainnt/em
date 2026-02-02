import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';
import { Type } from 'class-transformer';
import { LessonUpdateWithoutReportsInput } from './lesson-update-without-reports.input';

@InputType()
export class LessonUpdateToOneWithWhereWithoutReportsInput {

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;

    @Field(() => LessonUpdateWithoutReportsInput, {nullable:false})
    @Type(() => LessonUpdateWithoutReportsInput)
    data!: LessonUpdateWithoutReportsInput;
}
