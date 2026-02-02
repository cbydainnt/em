import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DocumentWhereInput } from './document-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyDocumentArgs {

    @Field(() => DocumentWhereInput, {nullable:true})
    @Type(() => DocumentWhereInput)
    where?: DocumentWhereInput;
}
