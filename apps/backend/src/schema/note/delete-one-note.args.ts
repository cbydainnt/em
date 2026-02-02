import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { NoteWhereUniqueInput } from './note-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneNoteArgs {

    @Field(() => NoteWhereUniqueInput, {nullable:false})
    @Type(() => NoteWhereUniqueInput)
    where!: Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>;
}
