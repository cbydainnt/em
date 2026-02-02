import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ComboCourseWhereUniqueInput } from './combo-course-where-unique.input';
import { Type } from 'class-transformer';
import { ComboCourseCreateInput } from './combo-course-create.input';
import { ComboCourseUpdateInput } from './combo-course-update.input';

@ArgsType()
export class UpsertOneComboCourseArgs {

    @Field(() => ComboCourseWhereUniqueInput, {nullable:false})
    @Type(() => ComboCourseWhereUniqueInput)
    where!: Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>;

    @Field(() => ComboCourseCreateInput, {nullable:false})
    @Type(() => ComboCourseCreateInput)
    create!: ComboCourseCreateInput;

    @Field(() => ComboCourseUpdateInput, {nullable:false})
    @Type(() => ComboCourseUpdateInput)
    update!: ComboCourseUpdateInput;
}
