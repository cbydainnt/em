import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { NoteUpdateInput } from './note-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { NoteWhereUniqueInput } from './note-where-unique.input';

@ArgsType()
export class UpdateOneNoteArgs {

    @Field(() => NoteUpdateInput, {nullable:false})
    @Type(() => NoteUpdateInput)
    data!: NoteUpdateInput;

    @Field(() => NoteWhereUniqueInput, {nullable:false})
    @Type(() => NoteWhereUniqueInput)
    where!: Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>;
}
