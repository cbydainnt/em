import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboCourseWhereInput } from './combo-course-where.input';
import { Type } from 'class-transformer';
import { ComboCourseOrderByWithRelationInput } from './combo-course-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ComboCourseWhereUniqueInput } from './combo-course-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ComboCourseCountAggregateInput } from './combo-course-count-aggregate.input';
import { ComboCourseMinAggregateInput } from './combo-course-min-aggregate.input';
import { ComboCourseMaxAggregateInput } from './combo-course-max-aggregate.input';

@ArgsType()
export class ComboCourseAggregateArgs {

    @Field(() => ComboCourseWhereInput, {nullable:true})
    @Type(() => ComboCourseWhereInput)
    where?: ComboCourseWhereInput;

    @Field(() => [ComboCourseOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ComboCourseOrderByWithRelationInput>;

    @Field(() => ComboCourseWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>;

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
