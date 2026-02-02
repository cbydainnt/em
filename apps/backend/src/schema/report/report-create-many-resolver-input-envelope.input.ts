import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateManyResolverInput } from './report-create-many-resolver.input';
import { Type } from 'class-transformer';

@InputType()
export class ReportCreateManyResolverInputEnvelope {

    @Field(() => [ReportCreateManyResolverInput], {nullable:false})
    @Type(() => ReportCreateManyResolverInput)
    data!: Array<ReportCreateManyResolverInput>;
}
