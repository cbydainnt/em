import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';
import { Type } from 'class-transformer';
import { ComboCreateWithoutCategoriesInput } from './combo-create-without-categories.input';

@InputType()
export class ComboCreateOrConnectWithoutCategoriesInput {

    @Field(() => ComboWhereUniqueInput, {nullable:false})
    @Type(() => ComboWhereUniqueInput)
    where!: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;

    @Field(() => ComboCreateWithoutCategoriesInput, {nullable:false})
    @Type(() => ComboCreateWithoutCategoriesInput)
    create!: ComboCreateWithoutCategoriesInput;
}
