import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboCourseUpdateInput } from './combo-course-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ComboCourseWhereUniqueInput } from './combo-course-where-unique.input';

@ArgsType()
export class UpdateOneComboCourseArgs {

    @Field(() => ComboCourseUpdateInput, {nullable:false})
    @Type(() => ComboCourseUpdateInput)
    data!: ComboCourseUpdateInput;

    @Field(() => ComboCourseWhereUniqueInput, {nullable:false})
    @Type(() => ComboCourseWhereUniqueInput)
    where!: Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>;
}
