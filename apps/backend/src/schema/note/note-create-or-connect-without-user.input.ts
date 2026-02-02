import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { NoteWhereUniqueInput } from './note-where-unique.input';
import { Type } from 'class-transformer';
import { NoteCreateWithoutUserInput } from './note-create-without-user.input';

@InputType()
export class NoteCreateOrConnectWithoutUserInput {

    @Field(() => NoteWhereUniqueInput, {nullable:false})
    @Type(() => NoteWhereUniqueInput)
    where!: Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>;

    @Field(() => NoteCreateWithoutUserInput, {nullable:false})
    @Type(() => NoteCreateWithoutUserInput)
    create!: NoteCreateWithoutUserInput;
}
