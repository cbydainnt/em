import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCreateWithoutCategoriesInput } from './combo-create-without-categories.input';
import { Type } from 'class-transformer';
import { ComboCreateOrConnectWithoutCategoriesInput } from './combo-create-or-connect-without-categories.input';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';

@InputType()
export class ComboCreateNestedOneWithoutCategoriesInput {

    @Field(() => ComboCreateWithoutCategoriesInput, {nullable:true})
    @Type(() => ComboCreateWithoutCategoriesInput)
    create?: ComboCreateWithoutCategoriesInput;

    @Field(() => ComboCreateOrConnectWithoutCategoriesInput, {nullable:true})
    @Type(() => ComboCreateOrConnectWithoutCategoriesInput)
    connectOrCreate?: ComboCreateOrConnectWithoutCategoriesInput;

    @Field(() => ComboWhereUniqueInput, {nullable:true})
    @Type(() => ComboWhereUniqueInput)
    connect?: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;
}
