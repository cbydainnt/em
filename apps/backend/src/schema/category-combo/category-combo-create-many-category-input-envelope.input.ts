import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryComboCreateManyCategoryInput } from './category-combo-create-many-category.input';
import { Type } from 'class-transformer';

@InputType()
export class CategoryComboCreateManyCategoryInputEnvelope {

    @Field(() => [CategoryComboCreateManyCategoryInput], {nullable:false})
    @Type(() => CategoryComboCreateManyCategoryInput)
    data!: Array<CategoryComboCreateManyCategoryInput>;
}
