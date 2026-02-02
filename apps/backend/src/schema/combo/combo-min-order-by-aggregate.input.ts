import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ComboMinOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    combo_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    original_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_by?: keyof typeof SortOrder;
}
