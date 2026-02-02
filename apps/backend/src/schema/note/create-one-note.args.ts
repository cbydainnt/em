import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { NoteCreateInput } from './note-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneNoteArgs {

    @Field(() => NoteCreateInput, {nullable:false})
    @Type(() => NoteCreateInput)
    data!: NoteCreateInput;
}
