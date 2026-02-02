import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MSystemUpdateInput } from './m-system-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { MSystemWhereUniqueInput } from './m-system-where-unique.input';

@ArgsType()
export class UpdateOneMSystemArgs {

    @Field(() => MSystemUpdateInput, {nullable:false})
    @Type(() => MSystemUpdateInput)
    data!: MSystemUpdateInput;

    @Field(() => MSystemWhereUniqueInput, {nullable:false})
    @Type(() => MSystemWhereUniqueInput)
    where!: Prisma.AtLeast<MSystemWhereUniqueInput, 'id' | 'param_key_param_no'>;
}
