import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { NoteWhereInput } from './note-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyNoteArgs {

    @Field(() => NoteWhereInput, {nullable:true})
    @Type(() => NoteWhereInput)
    where?: NoteWhereInput;
}
