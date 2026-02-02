import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { SystemBannerConfigCountAggregate } from './system-banner-config-count-aggregate.output';
import { SystemBannerConfigMinAggregate } from './system-banner-config-min-aggregate.output';
import { SystemBannerConfigMaxAggregate } from './system-banner-config-max-aggregate.output';

@ObjectType()
export class AggregateSystemBannerConfig {

    @Field(() => SystemBannerConfigCountAggregate, {nullable:true})
    _count?: SystemBannerConfigCountAggregate;

    @Field(() => SystemBannerConfigMinAggregate, {nullable:true})
    _min?: SystemBannerConfigMinAggregate;

    @Field(() => SystemBannerConfigMaxAggregate, {nullable:true})
    _max?: SystemBannerConfigMaxAggregate;
}
