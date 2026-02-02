import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { NoteWhereUniqueInput } from './note-where-unique.input';
import { Type } from 'class-transformer';
import { NoteUpdateWithoutUserInput } from './note-update-without-user.input';
import { NoteCreateWithoutUserInput } from './note-create-without-user.input';

@InputType()
export class NoteUpsertWithWhereUniqueWithoutUserInput {

    @Field(() => NoteWhereUniqueInput, {nullable:false})
    @Type(() => NoteWhereUniqueInput)
    where!: Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>;

    @Field(() => NoteUpdateWithoutUserInput, {nullable:false})
    @Type(() => NoteUpdateWithoutUserInput)
    update!: NoteUpdateWithoutUserInput;

    @Field(() => NoteCreateWithoutUserInput, {nullable:false})
    @Type(() => NoteCreateWithoutUserInput)
    create!: NoteCreateWithoutUserInput;
}
