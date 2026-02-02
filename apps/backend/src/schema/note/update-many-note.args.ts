import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { NoteUpdateManyMutationInput } from './note-update-many-mutation.input';
import { Type } from 'class-transformer';
import { NoteWhereInput } from './note-where.input';

@ArgsType()
export class UpdateManyNoteArgs {

    @Field(() => NoteUpdateManyMutationInput, {nullable:false})
    @Type(() => NoteUpdateManyMutationInput)
    data!: NoteUpdateManyMutationInput;

    @Field(() => NoteWhereInput, {nullable:true})
    @Type(() => NoteWhereInput)
    where?: NoteWhereInput;
}
