import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ComboCourseWhereUniqueInput } from './combo-course-where-unique.input';
import { Type } from 'class-transformer';
import { ComboCourseUpdateWithoutComboInput } from './combo-course-update-without-combo.input';

@InputType()
export class ComboCourseUpdateWithWhereUniqueWithoutComboInput {

    @Field(() => ComboCourseWhereUniqueInput, {nullable:false})
    @Type(() => ComboCourseWhereUniqueInput)
    where!: Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>;

    @Field(() => ComboCourseUpdateWithoutComboInput, {nullable:false})
    @Type(() => ComboCourseUpdateWithoutComboInput)
    data!: ComboCourseUpdateWithoutComboInput;
}
