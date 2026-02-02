import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryComboScalarWhereInput } from './category-combo-scalar-where.input';
import { Type } from 'class-transformer';
import { CategoryComboUncheckedUpdateManyWithoutComboInput } from './category-combo-unchecked-update-many-without-combo.input';

@InputType()
export class CategoryComboUpdateManyWithWhereWithoutComboInput {

    @Field(() => CategoryComboScalarWhereInput, {nullable:false})
    @Type(() => CategoryComboScalarWhereInput)
    where!: CategoryComboScalarWhereInput;

    @Field(() => CategoryComboUncheckedUpdateManyWithoutComboInput, {nullable:false})
    @Type(() => CategoryComboUncheckedUpdateManyWithoutComboInput)
    data!: CategoryComboUncheckedUpdateManyWithoutComboInput;
}
