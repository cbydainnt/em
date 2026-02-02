import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MSystemUpdateManyMutationInput } from './m-system-update-many-mutation.input';
import { Type } from 'class-transformer';
import { MSystemWhereInput } from './m-system-where.input';

@ArgsType()
export class UpdateManyMSystemArgs {

    @Field(() => MSystemUpdateManyMutationInput, {nullable:false})
    @Type(() => MSystemUpdateManyMutationInput)
    data!: MSystemUpdateManyMutationInput;

    @Field(() => MSystemWhereInput, {nullable:true})
    @Type(() => MSystemWhereInput)
    where?: MSystemWhereInput;
}
