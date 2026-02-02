import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryComboScalarWhereInput } from './category-combo-scalar-where.input';
import { Type } from 'class-transformer';
import { CategoryComboUncheckedUpdateManyWithoutCategoryInput } from './category-combo-unchecked-update-many-without-category.input';

@InputType()
export class CategoryComboUpdateManyWithWhereWithoutCategoryInput {

    @Field(() => CategoryComboScalarWhereInput, {nullable:false})
    @Type(() => CategoryComboScalarWhereInput)
    where!: CategoryComboScalarWhereInput;

    @Field(() => CategoryComboUncheckedUpdateManyWithoutCategoryInput, {nullable:false})
    @Type(() => CategoryComboUncheckedUpdateManyWithoutCategoryInput)
    data!: CategoryComboUncheckedUpdateManyWithoutCategoryInput;
}
