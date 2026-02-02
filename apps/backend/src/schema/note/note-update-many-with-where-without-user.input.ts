import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NoteScalarWhereInput } from './note-scalar-where.input';
import { Type } from 'class-transformer';
import { NoteUpdateManyMutationInput } from './note-update-many-mutation.input';

@InputType()
export class NoteUpdateManyWithWhereWithoutUserInput {

    @Field(() => NoteScalarWhereInput, {nullable:false})
    @Type(() => NoteScalarWhereInput)
    where!: NoteScalarWhereInput;

    @Field(() => NoteUpdateManyMutationInput, {nullable:false})
    @Type(() => NoteUpdateManyMutationInput)
    data!: NoteUpdateManyMutationInput;
}
