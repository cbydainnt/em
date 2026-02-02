import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CategoryComboCreateManyInput } from './category-combo-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyCategoryComboArgs {

    @Field(() => [CategoryComboCreateManyInput], {nullable:false})
    @Type(() => CategoryComboCreateManyInput)
    data!: Array<CategoryComboCreateManyInput>;
}
