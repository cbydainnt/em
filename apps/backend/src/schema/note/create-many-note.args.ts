import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { NoteCreateManyInput } from './note-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyNoteArgs {

    @Field(() => [NoteCreateManyInput], {nullable:false})
    @Type(() => NoteCreateManyInput)
    data!: Array<NoteCreateManyInput>;
}
