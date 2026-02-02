import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DocumentUpdateInput } from './document-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { DocumentWhereUniqueInput } from './document-where-unique.input';

@ArgsType()
export class UpdateOneDocumentArgs {

    @Field(() => DocumentUpdateInput, {nullable:false})
    @Type(() => DocumentUpdateInput)
    data!: DocumentUpdateInput;

    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'document_id'>;
}
