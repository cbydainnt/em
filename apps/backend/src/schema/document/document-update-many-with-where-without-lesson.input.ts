import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DocumentScalarWhereInput } from './document-scalar-where.input';
import { Type } from 'class-transformer';
import { DocumentUpdateManyMutationInput } from './document-update-many-mutation.input';

@InputType()
export class DocumentUpdateManyWithWhereWithoutLessonInput {

    @Field(() => DocumentScalarWhereInput, {nullable:false})
    @Type(() => DocumentScalarWhereInput)
    where!: DocumentScalarWhereInput;

    @Field(() => DocumentUpdateManyMutationInput, {nullable:false})
    @Type(() => DocumentUpdateManyMutationInput)
    data!: DocumentUpdateManyMutationInput;
}
