import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboUpdateManyMutationInput } from './combo-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ComboWhereInput } from './combo-where.input';

@ArgsType()
export class UpdateManyComboArgs {

    @Field(() => ComboUpdateManyMutationInput, {nullable:false})
    @Type(() => ComboUpdateManyMutationInput)
    data!: ComboUpdateManyMutationInput;

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    where?: ComboWhereInput;
}
