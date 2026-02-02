import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ComboCourseWhereUniqueInput } from './combo-course-where-unique.input';
import { Type } from 'class-transformer';
import { ComboCourseCreateWithoutComboInput } from './combo-course-create-without-combo.input';

@InputType()
export class ComboCourseCreateOrConnectWithoutComboInput {

    @Field(() => ComboCourseWhereUniqueInput, {nullable:false})
    @Type(() => ComboCourseWhereUniqueInput)
    where!: Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>;

    @Field(() => ComboCourseCreateWithoutComboInput, {nullable:false})
    @Type(() => ComboCourseCreateWithoutComboInput)
    create!: ComboCourseCreateWithoutComboInput;
}
