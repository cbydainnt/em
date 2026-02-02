import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ActiveCodeUpdateInput } from './active-code-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ActiveCodeWhereUniqueInput } from './active-code-where-unique.input';

@ArgsType()
export class UpdateOneActiveCodeArgs {

    @Field(() => ActiveCodeUpdateInput, {nullable:false})
    @Type(() => ActiveCodeUpdateInput)
    data!: ActiveCodeUpdateInput;

    @Field(() => ActiveCodeWhereUniqueInput, {nullable:false})
    @Type(() => ActiveCodeWhereUniqueInput)
    where!: Prisma.AtLeast<ActiveCodeWhereUniqueInput, 'active_code_id'>;
}
