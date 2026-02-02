import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueComboArgs {

    @Field(() => ComboWhereUniqueInput, {nullable:false})
    @Type(() => ComboWhereUniqueInput)
    where!: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;
}
