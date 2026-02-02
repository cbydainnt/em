import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SystemBannerConfigCountOrderByAggregateInput } from './system-banner-config-count-order-by-aggregate.input';
import { SystemBannerConfigMaxOrderByAggregateInput } from './system-banner-config-max-order-by-aggregate.input';
import { SystemBannerConfigMinOrderByAggregateInput } from './system-banner-config-min-order-by-aggregate.input';

@InputType()
export class SystemBannerConfigOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    title_segments?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    description_config?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    background_css?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    main_image_src?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    main_floating_image_config?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    main_floating_image_src?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    title_decor_image_src?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    button_decor_image_src?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    show_action_button?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    action_button_text?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    action_button_link?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    is_default?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    is_active?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_by?: keyof typeof SortOrder;

    @Field(() => SystemBannerConfigCountOrderByAggregateInput, {nullable:true})
    _count?: SystemBannerConfigCountOrderByAggregateInput;

    @Field(() => SystemBannerConfigMaxOrderByAggregateInput, {nullable:true})
    _max?: SystemBannerConfigMaxOrderByAggregateInput;

    @Field(() => SystemBannerConfigMinOrderByAggregateInput, {nullable:true})
    _min?: SystemBannerConfigMinOrderByAggregateInput;
}
