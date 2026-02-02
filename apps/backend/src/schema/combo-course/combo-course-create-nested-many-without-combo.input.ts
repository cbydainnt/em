import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCourseCreateWithoutComboInput } from './combo-course-create-without-combo.input';
import { Type } from 'class-transformer';
import { ComboCourseCreateOrConnectWithoutComboInput } from './combo-course-create-or-connect-without-combo.input';
import { ComboCourseCreateManyComboInputEnvelope } from './combo-course-create-many-combo-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ComboCourseWhereUniqueInput } from './combo-course-where-unique.input';

@InputType()
export class ComboCourseCreateNestedManyWithoutComboInput {

    @Field(() => [ComboCourseCreateWithoutComboInput], {nullable:true})
    @Type(() => ComboCourseCreateWithoutComboInput)
    create?: Array<ComboCourseCreateWithoutComboInput>;

    @Field(() => [ComboCourseCreateOrConnectWithoutComboInput], {nullable:true})
    @Type(() => ComboCourseCreateOrConnectWithoutComboInput)
    connectOrCreate?: Array<ComboCourseCreateOrConnectWithoutComboInput>;

    @Field(() => ComboCourseCreateManyComboInputEnvelope, {nullable:true})
    @Type(() => ComboCourseCreateManyComboInputEnvelope)
    createMany?: ComboCourseCreateManyComboInputEnvelope;

    @Field(() => [ComboCourseWhereUniqueInput], {nullable:true})
    @Type(() => ComboCourseWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>>;
}
