import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CategoryWhereUniqueInput } from './category-where-unique.input';
import { Type } from 'class-transformer';
import { CategoryCreateWithoutCombosInput } from './category-create-without-combos.input';

@InputType()
export class CategoryCreateOrConnectWithoutCombosInput {

    @Field(() => CategoryWhereUniqueInput, {nullable:false})
    @Type(() => CategoryWhereUniqueInput)
    where!: Prisma.AtLeast<CategoryWhereUniqueInput, 'category_id' | 'title'>;

    @Field(() => CategoryCreateWithoutCombosInput, {nullable:false})
    @Type(() => CategoryCreateWithoutCombosInput)
    create!: CategoryCreateWithoutCombosInput;
}
