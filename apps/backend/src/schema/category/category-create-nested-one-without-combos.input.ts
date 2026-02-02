import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryCreateWithoutCombosInput } from './category-create-without-combos.input';
import { Type } from 'class-transformer';
import { CategoryCreateOrConnectWithoutCombosInput } from './category-create-or-connect-without-combos.input';
import { Prisma } from '@prisma/client';
import { CategoryWhereUniqueInput } from './category-where-unique.input';

@InputType()
export class CategoryCreateNestedOneWithoutCombosInput {

    @Field(() => CategoryCreateWithoutCombosInput, {nullable:true})
    @Type(() => CategoryCreateWithoutCombosInput)
    create?: CategoryCreateWithoutCombosInput;

    @Field(() => CategoryCreateOrConnectWithoutCombosInput, {nullable:true})
    @Type(() => CategoryCreateOrConnectWithoutCombosInput)
    connectOrCreate?: CategoryCreateOrConnectWithoutCombosInput;

    @Field(() => CategoryWhereUniqueInput, {nullable:true})
    @Type(() => CategoryWhereUniqueInput)
    connect?: Prisma.AtLeast<CategoryWhereUniqueInput, 'category_id' | 'title'>;
}
