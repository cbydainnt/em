import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SystemBannerConfigWhereInput } from './system-banner-config-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManySystemBannerConfigArgs {

    @Field(() => SystemBannerConfigWhereInput, {nullable:true})
    @Type(() => SystemBannerConfigWhereInput)
    where?: SystemBannerConfigWhereInput;
}
