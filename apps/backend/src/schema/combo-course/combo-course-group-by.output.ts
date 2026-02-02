import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ComboCourseCountAggregate } from './combo-course-count-aggregate.output';
import { ComboCourseMinAggregate } from './combo-course-min-aggregate.output';
import { ComboCourseMaxAggregate } from './combo-course-max-aggregate.output';

@ObjectType()
export class ComboCourseGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    combo_id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => ComboCourseCountAggregate, {nullable:true})
    _count?: ComboCourseCountAggregate;

    @Field(() => ComboCourseMinAggregate, {nullable:true})
    _min?: ComboCourseMinAggregate;

    @Field(() => ComboCourseMaxAggregate, {nullable:true})
    _max?: ComboCourseMaxAggregate;
}
