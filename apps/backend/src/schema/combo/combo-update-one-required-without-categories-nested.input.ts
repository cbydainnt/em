import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCreateWithoutCategoriesInput } from './combo-create-without-categories.input';
import { Type } from 'class-transformer';
import { ComboCreateOrConnectWithoutCategoriesInput } from './combo-create-or-connect-without-categories.input';
import { ComboUpsertWithoutCategoriesInput } from './combo-upsert-without-categories.input';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';
import { ComboUpdateToOneWithWhereWithoutCategoriesInput } from './combo-update-to-one-with-where-without-categories.input';

@InputType()
export class ComboUpdateOneRequiredWithoutCategoriesNestedInput {

    @Field(() => ComboCreateWithoutCategoriesInput, {nullable:true})
    @Type(() => ComboCreateWithoutCategoriesInput)
    create?: ComboCreateWithoutCategoriesInput;

    @Field(() => ComboCreateOrConnectWithoutCategoriesInput, {nullable:true})
    @Type(() => ComboCreateOrConnectWithoutCategoriesInput)
    connectOrCreate?: ComboCreateOrConnectWithoutCategoriesInput;

    @Field(() => ComboUpsertWithoutCategoriesInput, {nullable:true})
    @Type(() => ComboUpsertWithoutCategoriesInput)
    upsert?: ComboUpsertWithoutCategoriesInput;

    @Field(() => ComboWhereUniqueInput, {nullable:true})
    @Type(() => ComboWhereUniqueInput)
    connect?: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;

    @Field(() => ComboUpdateToOneWithWhereWithoutCategoriesInput, {nullable:true})
    @Type(() => ComboUpdateToOneWithWhereWithoutCategoriesInput)
    update?: ComboUpdateToOneWithWhereWithoutCategoriesInput;
}
