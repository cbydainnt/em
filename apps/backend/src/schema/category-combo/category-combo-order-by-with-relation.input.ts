import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { CategoryOrderByWithRelationInput } from '../category/category-order-by-with-relation.input';
import { ComboOrderByWithRelationInput } from '../combo/combo-order-by-with-relation.input';

@InputType()
export class CategoryComboOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    category_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_id?: keyof typeof SortOrder;

    @Field(() => CategoryOrderByWithRelationInput, {nullable:true})
    category?: CategoryOrderByWithRelationInput;

    @Field(() => ComboOrderByWithRelationInput, {nullable:true})
    combo?: ComboOrderByWithRelationInput;
}
