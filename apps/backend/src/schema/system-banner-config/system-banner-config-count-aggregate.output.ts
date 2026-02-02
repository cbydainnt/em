import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class SystemBannerConfigCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    title_segments!: number;

    @Field(() => Int, {nullable:false})
    description_config!: number;

    @Field(() => Int, {nullable:false})
    background_css!: number;

    @Field(() => Int, {nullable:false})
    main_image_src!: number;

    @Field(() => Int, {nullable:false})
    main_floating_image_config!: number;

    @Field(() => Int, {nullable:false})
    main_floating_image_src!: number;

    @Field(() => Int, {nullable:false})
    title_decor_image_src!: number;

    @Field(() => Int, {nullable:false})
    button_decor_image_src!: number;

    @Field(() => Int, {nullable:false})
    show_action_button!: number;

    @Field(() => Int, {nullable:false})
    action_button_text!: number;

    @Field(() => Int, {nullable:false})
    action_button_link!: number;

    @Field(() => Int, {nullable:false})
    is_default!: number;

    @Field(() => Int, {nullable:false})
    is_active!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    updated_by!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
