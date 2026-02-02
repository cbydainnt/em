import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ComboCourseCountAggregate } from './combo-course-count-aggregate.output';
import { ComboCourseMinAggregate } from './combo-course-min-aggregate.output';
import { ComboCourseMaxAggregate } from './combo-course-max-aggregate.output';

@ObjectType()
export class AggregateComboCourse {

    @Field(() => ComboCourseCountAggregate, {nullable:true})
    _count?: ComboCourseCountAggregate;

    @Field(() => ComboCourseMinAggregate, {nullable:true})
    _min?: ComboCourseMinAggregate;

    @Field(() => ComboCourseMaxAggregate, {nullable:true})
    _max?: ComboCourseMaxAggregate;
}
