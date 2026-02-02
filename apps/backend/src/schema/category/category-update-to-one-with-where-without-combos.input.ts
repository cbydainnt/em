import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryWhereInput } from './category-where.input';
import { Type } from 'class-transformer';
import { CategoryUpdateWithoutCombosInput } from './category-update-without-combos.input';

@InputType()
export class CategoryUpdateToOneWithWhereWithoutCombosInput {

    @Field(() => CategoryWhereInput, {nullable:true})
    @Type(() => CategoryWhereInput)
    where?: CategoryWhereInput;

    @Field(() => CategoryUpdateWithoutCombosInput, {nullable:false})
    @Type(() => CategoryUpdateWithoutCombosInput)
    data!: CategoryUpdateWithoutCombosInput;
}
