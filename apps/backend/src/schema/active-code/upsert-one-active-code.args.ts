import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ActiveCodeWhereUniqueInput } from './active-code-where-unique.input';
import { Type } from 'class-transformer';
import { ActiveCodeCreateInput } from './active-code-create.input';
import { ActiveCodeUpdateInput } from './active-code-update.input';

@ArgsType()
export class UpsertOneActiveCodeArgs {

    @Field(() => ActiveCodeWhereUniqueInput, {nullable:false})
    @Type(() => ActiveCodeWhereUniqueInput)
    where!: Prisma.AtLeast<ActiveCodeWhereUniqueInput, 'active_code_id'>;

    @Field(() => ActiveCodeCreateInput, {nullable:false})
    @Type(() => ActiveCodeCreateInput)
    create!: ActiveCodeCreateInput;

    @Field(() => ActiveCodeUpdateInput, {nullable:false})
    @Type(() => ActiveCodeUpdateInput)
    update!: ActiveCodeUpdateInput;
}
