import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DocumentWhereInput } from './document-where.input';
import { Type } from 'class-transformer';
import { DocumentOrderByWithRelationInput } from './document-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { DocumentWhereUniqueInput } from './document-where-unique.input';
import { Int } from '@nestjs/graphql';
import { DocumentScalarFieldEnum } from './document-scalar-field.enum';

@ArgsType()
export class FindFirstDocumentOrThrowArgs {

    @Field(() => DocumentWhereInput, {nullable:true})
    @Type(() => DocumentWhereInput)
    where?: DocumentWhereInput;

    @Field(() => [DocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DocumentOrderByWithRelationInput>;

    @Field(() => DocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DocumentWhereUniqueInput, 'document_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [DocumentScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof DocumentScalarFieldEnum>;
}
