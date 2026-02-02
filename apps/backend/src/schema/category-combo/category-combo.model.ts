import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Category } from '../category/category.model';
import { Combo } from '../combo/combo.model';

@ObjectType()
export class CategoryCombo {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    category_id!: string;

    @Field(() => String, {nullable:false})
    combo_id!: string;

    @Field(() => Category, {nullable:false})
    category?: Category;

    @Field(() => Combo, {nullable:false})
    combo?: Combo;
}
