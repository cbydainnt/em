import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DocumentWhereUniqueInput } from './document-where-unique.input';
import { Type } from 'class-transformer';
import { DocumentCreateInput } from './document-create.input';
import { DocumentUpdateInput } from './document-update.input';

@ArgsType()
export class UpsertOneDocumentArgs {

    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'document_id'>;

    @Field(() => DocumentCreateInput, {nullable:false})
    @Type(() => DocumentCreateInput)
    create!: DocumentCreateInput;

    @Field(() => DocumentUpdateInput, {nullable:false})
    @Type(() => DocumentUpdateInput)
    update!: DocumentUpdateInput;
}
