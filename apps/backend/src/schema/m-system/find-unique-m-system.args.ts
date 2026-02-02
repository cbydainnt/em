import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { MSystemWhereUniqueInput } from './m-system-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueMSystemArgs {

    @Field(() => MSystemWhereUniqueInput, {nullable:false})
    @Type(() => MSystemWhereUniqueInput)
    where!: Prisma.AtLeast<MSystemWhereUniqueInput, 'id' | 'param_key_param_no'>;
}
