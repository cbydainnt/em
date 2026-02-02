import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DocumentCreateManyInput } from './document-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyDocumentArgs {

    @Field(() => [DocumentCreateManyInput], {nullable:false})
    @Type(() => DocumentCreateManyInput)
    data!: Array<DocumentCreateManyInput>;
}
