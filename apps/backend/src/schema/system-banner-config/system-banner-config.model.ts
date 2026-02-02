import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class SystemBannerConfig {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => GraphQLJSON, {nullable:true})
    title_segments!: any | null;

    @Field(() => GraphQLJSON, {nullable:true})
    description_config!: any | null;

    @Field(() => String, {nullable:false})
    background_css!: string;

    @Field(() => String, {nullable:true})
    main_image_src!: string | null;

    @Field(() => GraphQLJSON, {nullable:true})
    main_floating_image_config!: any | null;

    @Field(() => String, {nullable:true})
    main_floating_image_src!: string | null;

    @Field(() => String, {nullable:true})
    title_decor_image_src!: string | null;

    @Field(() => String, {nullable:true})
    button_decor_image_src!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:true})
    show_action_button!: boolean;

    @Field(() => String, {nullable:true})
    action_button_text!: string | null;

    @Field(() => String, {nullable:true})
    action_button_link!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    is_default!: boolean;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    is_active!: boolean;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => String, {nullable:true})
    updated_by!: string | null;
}
