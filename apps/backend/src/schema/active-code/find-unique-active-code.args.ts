import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ActiveCodeWhereUniqueInput } from './active-code-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueActiveCodeArgs {

    @Field(() => ActiveCodeWhereUniqueInput, {nullable:false})
    @Type(() => ActiveCodeWhereUniqueInput)
    where!: Prisma.AtLeast<ActiveCodeWhereUniqueInput, 'active_code_id'>;
}
