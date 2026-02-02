import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboCourseWhereInput } from './combo-course-where.input';
import { Type } from 'class-transformer';
import { ComboCourseOrderByWithRelationInput } from './combo-course-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ComboCourseWhereUniqueInput } from './combo-course-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ComboCourseScalarFieldEnum } from './combo-course-scalar-field.enum';

@ArgsType()
export class FindManyComboCourseArgs {

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

    @Field(() => [ComboCourseScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ComboCourseScalarFieldEnum>;
}
