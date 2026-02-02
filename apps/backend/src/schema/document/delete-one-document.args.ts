import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DocumentWhereUniqueInput } from './document-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneDocumentArgs {

    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'document_id'>;
}
