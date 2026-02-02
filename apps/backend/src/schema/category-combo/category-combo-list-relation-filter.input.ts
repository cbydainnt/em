import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryComboWhereInput } from './category-combo-where.input';

@InputType()
export class CategoryComboListRelationFilter {

    @Field(() => CategoryComboWhereInput, {nullable:true})
    every?: CategoryComboWhereInput;

    @Field(() => CategoryComboWhereInput, {nullable:true})
    some?: CategoryComboWhereInput;

    @Field(() => CategoryComboWhereInput, {nullable:true})
    none?: CategoryComboWhereInput;
}
