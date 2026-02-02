import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonUpdateWithoutNotesInput } from './lesson-update-without-notes.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutNotesInput } from './lesson-create-without-notes.input';
import { LessonWhereInput } from './lesson-where.input';

@InputType()
export class LessonUpsertWithoutNotesInput {

    @Field(() => LessonUpdateWithoutNotesInput, {nullable:false})
    @Type(() => LessonUpdateWithoutNotesInput)
    update!: LessonUpdateWithoutNotesInput;

    @Field(() => LessonCreateWithoutNotesInput, {nullable:false})
    @Type(() => LessonCreateWithoutNotesInput)
    create!: LessonCreateWithoutNotesInput;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;
}
