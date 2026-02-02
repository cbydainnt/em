import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class SystemBannerConfigCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    title_segments?: true;

    @Field(() => Boolean, {nullable:true})
    description_config?: true;

    @Field(() => Boolean, {nullable:true})
    background_css?: true;

    @Field(() => Boolean, {nullable:true})
    main_image_src?: true;

    @Field(() => Boolean, {nullable:true})
    main_floating_image_config?: true;

    @Field(() => Boolean, {nullable:true})
    main_floating_image_src?: true;

    @Field(() => Boolean, {nullable:true})
    title_decor_image_src?: true;

    @Field(() => Boolean, {nullable:true})
    button_decor_image_src?: true;

    @Field(() => Boolean, {nullable:true})
    show_action_button?: true;

    @Field(() => Boolean, {nullable:true})
    action_button_text?: true;

    @Field(() => Boolean, {nullable:true})
    action_button_link?: true;

    @Field(() => Boolean, {nullable:true})
    is_default?: true;

    @Field(() => Boolean, {nullable:true})
    is_active?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    updated_by?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
