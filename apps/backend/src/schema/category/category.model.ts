import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CategoryCombo } from '../category-combo/category-combo.model';
import { CategoryCount } from './category-count.output';

@ObjectType()
export class Category {

    @Field(() => ID, {nullable:false})
    category_id!: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => String, {nullable:true})
    created_by!: string | null;

    @Field(() => String, {nullable:true})
    updated_by!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => Int, {nullable:false,defaultValue:0})
    sort_order!: number;

    @Field(() => [CategoryCombo], {nullable:true})
    combos?: Array<CategoryCombo>;

    @Field(() => CategoryCount, {nullable:false})
    _count?: CategoryCount;
}
