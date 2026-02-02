import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboUpdateInput } from './combo-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';

@ArgsType()
export class UpdateOneComboArgs {

    @Field(() => ComboUpdateInput, {nullable:false})
    @Type(() => ComboUpdateInput)
    data!: ComboUpdateInput;

    @Field(() => ComboWhereUniqueInput, {nullable:false})
    @Type(() => ComboWhereUniqueInput)
    where!: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;
}
