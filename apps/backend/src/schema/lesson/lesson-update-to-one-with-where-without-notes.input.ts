import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';
import { Type } from 'class-transformer';
import { LessonUpdateWithoutNotesInput } from './lesson-update-without-notes.input';

@InputType()
export class LessonUpdateToOneWithWhereWithoutNotesInput {

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;

    @Field(() => LessonUpdateWithoutNotesInput, {nullable:false})
    @Type(() => LessonUpdateWithoutNotesInput)
    data!: LessonUpdateWithoutNotesInput;
}
