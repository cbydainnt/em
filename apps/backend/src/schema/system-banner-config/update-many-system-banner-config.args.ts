import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SystemBannerConfigUpdateManyMutationInput } from './system-banner-config-update-many-mutation.input';
import { Type } from 'class-transformer';
import { SystemBannerConfigWhereInput } from './system-banner-config-where.input';

@ArgsType()
export class UpdateManySystemBannerConfigArgs {

    @Field(() => SystemBannerConfigUpdateManyMutationInput, {nullable:false})
    @Type(() => SystemBannerConfigUpdateManyMutationInput)
    data!: SystemBannerConfigUpdateManyMutationInput;

    @Field(() => SystemBannerConfigWhereInput, {nullable:true})
    @Type(() => SystemBannerConfigWhereInput)
    where?: SystemBannerConfigWhereInput;
}
