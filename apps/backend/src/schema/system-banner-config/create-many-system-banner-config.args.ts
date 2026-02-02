import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SystemBannerConfigCreateManyInput } from './system-banner-config-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManySystemBannerConfigArgs {

    @Field(() => [SystemBannerConfigCreateManyInput], {nullable:false})
    @Type(() => SystemBannerConfigCreateManyInput)
    data!: Array<SystemBannerConfigCreateManyInput>;
}
