import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryCreateWithoutCombosInput } from './category-create-without-combos.input';
import { Type } from 'class-transformer';
import { CategoryCreateOrConnectWithoutCombosInput } from './category-create-or-connect-without-combos.input';
import { CategoryUpsertWithoutCombosInput } from './category-upsert-without-combos.input';
import { Prisma } from '@prisma/client';
import { CategoryWhereUniqueInput } from './category-where-unique.input';
import { CategoryUpdateToOneWithWhereWithoutCombosInput } from './category-update-to-one-with-where-without-combos.input';

@InputType()
export class CategoryUpdateOneRequiredWithoutCombosNestedInput {

    @Field(() => CategoryCreateWithoutCombosInput, {nullable:true})
    @Type(() => CategoryCreateWithoutCombosInput)
    create?: CategoryCreateWithoutCombosInput;

    @Field(() => CategoryCreateOrConnectWithoutCombosInput, {nullable:true})
    @Type(() => CategoryCreateOrConnectWithoutCombosInput)
    connectOrCreate?: CategoryCreateOrConnectWithoutCombosInput;

    @Field(() => CategoryUpsertWithoutCombosInput, {nullable:true})
    @Type(() => CategoryUpsertWithoutCombosInput)
    upsert?: CategoryUpsertWithoutCombosInput;

    @Field(() => CategoryWhereUniqueInput, {nullable:true})
    @Type(() => CategoryWhereUniqueInput)
    connect?: Prisma.AtLeast<CategoryWhereUniqueInput, 'category_id' | 'title'>;

    @Field(() => CategoryUpdateToOneWithWhereWithoutCombosInput, {nullable:true})
    @Type(() => CategoryUpdateToOneWithWhereWithoutCombosInput)
    update?: CategoryUpdateToOneWithWhereWithoutCombosInput;
}
