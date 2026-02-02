import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryComboCreateManyComboInput } from './category-combo-create-many-combo.input';
import { Type } from 'class-transformer';

@InputType()
export class CategoryComboCreateManyComboInputEnvelope {

    @Field(() => [CategoryComboCreateManyComboInput], {nullable:false})
    @Type(() => CategoryComboCreateManyComboInput)
    data!: Array<CategoryComboCreateManyComboInput>;
}
