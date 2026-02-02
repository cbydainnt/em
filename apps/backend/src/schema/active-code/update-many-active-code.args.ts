import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ActiveCodeUpdateManyMutationInput } from './active-code-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ActiveCodeWhereInput } from './active-code-where.input';

@ArgsType()
export class UpdateManyActiveCodeArgs {

    @Field(() => ActiveCodeUpdateManyMutationInput, {nullable:false})
    @Type(() => ActiveCodeUpdateManyMutationInput)
    data!: ActiveCodeUpdateManyMutationInput;

    @Field(() => ActiveCodeWhereInput, {nullable:true})
    @Type(() => ActiveCodeWhereInput)
    where?: ActiveCodeWhereInput;
}
