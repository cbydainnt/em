import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { SectionCountAggregate } from './section-count-aggregate.output';
import { SectionMinAggregate } from './section-min-aggregate.output';
import { SectionMaxAggregate } from './section-max-aggregate.output';

@ObjectType()
export class SectionGroupBy {

    @Field(() => String, {nullable:false})
    section_id!: string;

    @Field(() => String, {nullable:false})
    section_title!: string;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => SectionCountAggregate, {nullable:true})
    _count?: SectionCountAggregate;

    @Field(() => SectionMinAggregate, {nullable:true})
    _min?: SectionMinAggregate;

    @Field(() => SectionMaxAggregate, {nullable:true})
    _max?: SectionMaxAggregate;
}
