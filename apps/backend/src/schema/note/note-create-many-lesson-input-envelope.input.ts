import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NoteCreateManyLessonInput } from './note-create-many-lesson.input';
import { Type } from 'class-transformer';

@InputType()
export class NoteCreateManyLessonInputEnvelope {

    @Field(() => [NoteCreateManyLessonInput], {nullable:false})
    @Type(() => NoteCreateManyLessonInput)
    data!: Array<NoteCreateManyLessonInput>;
}
