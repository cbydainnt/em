import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DocumentCreateInput } from './document-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneDocumentArgs {

    @Field(() => DocumentCreateInput, {nullable:false})
    @Type(() => DocumentCreateInput)
    data!: DocumentCreateInput;
}
