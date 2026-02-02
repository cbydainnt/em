import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { NoteWhereUniqueInput } from './note-where-unique.input';
import { Type } from 'class-transformer';
import { NoteCreateWithoutLessonInput } from './note-create-without-lesson.input';

@InputType()
export class NoteCreateOrConnectWithoutLessonInput {

    @Field(() => NoteWhereUniqueInput, {nullable:false})
    @Type(() => NoteWhereUniqueInput)
    where!: Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>;

    @Field(() => NoteCreateWithoutLessonInput, {nullable:false})
    @Type(() => NoteCreateWithoutLessonInput)
    create!: NoteCreateWithoutLessonInput;
}
