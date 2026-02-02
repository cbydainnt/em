import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { MSystemWhereUniqueInput } from './m-system-where-unique.input';
import { Type } from 'class-transformer';
import { MSystemCreateInput } from './m-system-create.input';
import { MSystemUpdateInput } from './m-system-update.input';

@ArgsType()
export class UpsertOneMSystemArgs {

    @Field(() => MSystemWhereUniqueInput, {nullable:false})
    @Type(() => MSystemWhereUniqueInput)
    where!: Prisma.AtLeast<MSystemWhereUniqueInput, 'id' | 'param_key_param_no'>;

    @Field(() => MSystemCreateInput, {nullable:false})
    @Type(() => MSystemCreateInput)
    create!: MSystemCreateInput;

    @Field(() => MSystemUpdateInput, {nullable:false})
    @Type(() => MSystemUpdateInput)
    update!: MSystemUpdateInput;
}
