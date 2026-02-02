import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { SystemBannerConfigCountAggregate } from './system-banner-config-count-aggregate.output';
import { SystemBannerConfigMinAggregate } from './system-banner-config-min-aggregate.output';
import { SystemBannerConfigMaxAggregate } from './system-banner-config-max-aggregate.output';

@ObjectType()
export class SystemBannerConfigGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

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

    @Field(() => Boolean, {nullable:false})
    show_action_button!: boolean;

    @Field(() => String, {nullable:true})
    action_button_text?: string;

    @Field(() => String, {nullable:true})
    action_button_link?: string;

    @Field(() => Boolean, {nullable:false})
    is_default!: boolean;

    @Field(() => Boolean, {nullable:false})
    is_active!: boolean;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => SystemBannerConfigCountAggregate, {nullable:true})
    _count?: SystemBannerConfigCountAggregate;

    @Field(() => SystemBannerConfigMinAggregate, {nullable:true})
    _min?: SystemBannerConfigMinAggregate;

    @Field(() => SystemBannerConfigMaxAggregate, {nullable:true})
    _max?: SystemBannerConfigMaxAggregate;
}
