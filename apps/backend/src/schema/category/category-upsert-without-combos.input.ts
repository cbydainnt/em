import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryUpdateWithoutCombosInput } from './category-update-without-combos.input';
import { Type } from 'class-transformer';
import { CategoryCreateWithoutCombosInput } from './category-create-without-combos.input';
import { CategoryWhereInput } from './category-where.input';

@InputType()
export class CategoryUpsertWithoutCombosInput {

    @Field(() => CategoryUpdateWithoutCombosInput, {nullable:false})
    @Type(() => CategoryUpdateWithoutCombosInput)
    update!: CategoryUpdateWithoutCombosInput;

    @Field(() => CategoryCreateWithoutCombosInput, {nullable:false})
    @Type(() => CategoryCreateWithoutCombosInput)
    create!: CategoryCreateWithoutCombosInput;

    @Field(() => CategoryWhereInput, {nullable:true})
    @Type(() => CategoryWhereInput)
    where?: CategoryWhereInput;
}
