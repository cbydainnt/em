import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DocumentUpdateManyMutationInput } from './document-update-many-mutation.input';
import { Type } from 'class-transformer';
import { DocumentWhereInput } from './document-where.input';

@ArgsType()
export class UpdateManyDocumentArgs {

    @Field(() => DocumentUpdateManyMutationInput, {nullable:false})
    @Type(() => DocumentUpdateManyMutationInput)
    data!: DocumentUpdateManyMutationInput;

    @Field(() => DocumentWhereInput, {nullable:true})
    @Type(() => DocumentWhereInput)
    where?: DocumentWhereInput;
}
