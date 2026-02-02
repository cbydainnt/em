import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboCourseWhereInput } from './combo-course-where.input';
import { Type } from 'class-transformer';
import { ComboCourseOrderByWithAggregationInput } from './combo-course-order-by-with-aggregation.input';
import { ComboCourseScalarFieldEnum } from './combo-course-scalar-field.enum';
import { ComboCourseScalarWhereWithAggregatesInput } from './combo-course-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ComboCourseCountAggregateInput } from './combo-course-count-aggregate.input';
import { ComboCourseMinAggregateInput } from './combo-course-min-aggregate.input';
import { ComboCourseMaxAggregateInput } from './combo-course-max-aggregate.input';

@ArgsType()
export class ComboCourseGroupByArgs {

    @Field(() => ComboCourseWhereInput, {nullable:true})
    @Type(() => ComboCourseWhereInput)
    where?: ComboCourseWhereInput;

    @Field(() => [ComboCourseOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ComboCourseOrderByWithAggregationInput>;

    @Field(() => [ComboCourseScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof ComboCourseScalarFieldEnum>;

    @Field(() => ComboCourseScalarWhereWithAggregatesInput, {nullable:true})
    having?: ComboCourseScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ComboCourseCountAggregateInput, {nullable:true})
    _count?: ComboCourseCountAggregateInput;

    @Field(() => ComboCourseMinAggregateInput, {nullable:true})
    _min?: ComboCourseMinAggregateInput;

    @Field(() => ComboCourseMaxAggregateInput, {nullable:true})
    _max?: ComboCourseMaxAggregateInput;
}
