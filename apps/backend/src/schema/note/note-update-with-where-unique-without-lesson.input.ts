import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { NoteWhereUniqueInput } from './note-where-unique.input';
import { Type } from 'class-transformer';
import { NoteUpdateWithoutLessonInput } from './note-update-without-lesson.input';

@InputType()
export class NoteUpdateWithWhereUniqueWithoutLessonInput {

    @Field(() => NoteWhereUniqueInput, {nullable:false})
    @Type(() => NoteWhereUniqueInput)
    where!: Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>;

    @Field(() => NoteUpdateWithoutLessonInput, {nullable:false})
    @Type(() => NoteUpdateWithoutLessonInput)
    data!: NoteUpdateWithoutLessonInput;
}
