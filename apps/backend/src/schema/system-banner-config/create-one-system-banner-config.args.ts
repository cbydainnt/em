import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SystemBannerConfigCreateInput } from './system-banner-config-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneSystemBannerConfigArgs {

    @Field(() => SystemBannerConfigCreateInput, {nullable:false})
    @Type(() => SystemBannerConfigCreateInput)
    data!: SystemBannerConfigCreateInput;
}
