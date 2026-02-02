import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { JsonNullableFilter } from '../prisma/json-nullable-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class SystemBannerConfigWhereInput {

    @Field(() => [SystemBannerConfigWhereInput], {nullable:true})
    AND?: Array<SystemBannerConfigWhereInput>;

    @Field(() => [SystemBannerConfigWhereInput], {nullable:true})
    OR?: Array<SystemBannerConfigWhereInput>;

    @Field(() => [SystemBannerConfigWhereInput], {nullable:true})
    NOT?: Array<SystemBannerConfigWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => JsonNullableFilter, {nullable:true})
    title_segments?: JsonNullableFilter;

    @Field(() => JsonNullableFilter, {nullable:true})
    description_config?: JsonNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    background_css?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    main_image_src?: StringNullableFilter;

    @Field(() => JsonNullableFilter, {nullable:true})
    main_floating_image_config?: JsonNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    main_floating_image_src?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    title_decor_image_src?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    button_decor_image_src?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    show_action_button?: BoolFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    action_button_text?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    action_button_link?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    is_default?: BoolFilter;

    @Field(() => BoolFilter, {nullable:true})
    is_active?: BoolFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    updated_by?: StringNullableFilter;
}
