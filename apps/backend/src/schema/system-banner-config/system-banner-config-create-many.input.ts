import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class SystemBannerConfigCreateManyInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => GraphQLJSON, {nullable:true})
    title_segments?: any;

    @Field(() => GraphQLJSON, {nullable:true})
    description_config?: any;

    @Field(() => String, {nullable:false})
    background_css!: string;

    @Field(() => String, {nullable:true})
    main_image_src?: string;

    @Field(() => GraphQLJSON, {nullable:true})
    main_floating_image_config?: any;

    @Field(() => String, {nullable:true})
    main_floating_image_src?: string;

    @Field(() => String, {nullable:true})
    title_decor_image_src?: string;

    @Field(() => String, {nullable:true})
    button_decor_image_src?: string;

    @Field(() => Boolean, {nullable:true})
    show_action_button?: boolean;

    @Field(() => String, {nullable:true})
    action_button_text?: string;

    @Field(() => String, {nullable:true})
    action_button_link?: string;

    @Field(() => Boolean, {nullable:true})
    is_default?: boolean;

    @Field(() => Boolean, {nullable:true})
    is_active?: boolean;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => String, {nullable:true})
    updated_by?: string;
}
