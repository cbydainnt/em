import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NoteCreateManyUserInput } from './note-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class NoteCreateManyUserInputEnvelope {

    @Field(() => [NoteCreateManyUserInput], {nullable:false})
    @Type(() => NoteCreateManyUserInput)
    data!: Array<NoteCreateManyUserInput>;
}
