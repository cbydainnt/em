import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCourseCreateWithoutComboInput } from './combo-course-create-without-combo.input';
import { Type } from 'class-transformer';
import { ComboCourseCreateOrConnectWithoutComboInput } from './combo-course-create-or-connect-without-combo.input';
import { ComboCourseUpsertWithWhereUniqueWithoutComboInput } from './combo-course-upsert-with-where-unique-without-combo.input';
import { ComboCourseCreateManyComboInputEnvelope } from './combo-course-create-many-combo-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ComboCourseWhereUniqueInput } from './combo-course-where-unique.input';
import { ComboCourseUpdateWithWhereUniqueWithoutComboInput } from './combo-course-update-with-where-unique-without-combo.input';
import { ComboCourseUpdateManyWithWhereWithoutComboInput } from './combo-course-update-many-with-where-without-combo.input';
import { ComboCourseScalarWhereInput } from './combo-course-scalar-where.input';

@InputType()
export class ComboCourseUpdateManyWithoutComboNestedInput {

    @Field(() => [ComboCourseCreateWithoutComboInput], {nullable:true})
    @Type(() => ComboCourseCreateWithoutComboInput)
    create?: Array<ComboCourseCreateWithoutComboInput>;

    @Field(() => [ComboCourseCreateOrConnectWithoutComboInput], {nullable:true})
    @Type(() => ComboCourseCreateOrConnectWithoutComboInput)
    connectOrCreate?: Array<ComboCourseCreateOrConnectWithoutComboInput>;

    @Field(() => [ComboCourseUpsertWithWhereUniqueWithoutComboInput], {nullable:true})
    @Type(() => ComboCourseUpsertWithWhereUniqueWithoutComboInput)
    upsert?: Array<ComboCourseUpsertWithWhereUniqueWithoutComboInput>;

    @Field(() => ComboCourseCreateManyComboInputEnvelope, {nullable:true})
    @Type(() => ComboCourseCreateManyComboInputEnvelope)
    createMany?: ComboCourseCreateManyComboInputEnvelope;

    @Field(() => [ComboCourseWhereUniqueInput], {nullable:true})
    @Type(() => ComboCourseWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>>;

    @Field(() => [ComboCourseWhereUniqueInput], {nullable:true})
    @Type(() => ComboCourseWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>>;

    @Field(() => [ComboCourseWhereUniqueInput], {nullable:true})
    @Type(() => ComboCourseWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>>;

    @Field(() => [ComboCourseWhereUniqueInput], {nullable:true})
    @Type(() => ComboCourseWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ComboCourseWhereUniqueInput, 'id' | 'combo_id_course_id'>>;

    @Field(() => [ComboCourseUpdateWithWhereUniqueWithoutComboInput], {nullable:true})
    @Type(() => ComboCourseUpdateWithWhereUniqueWithoutComboInput)
    update?: Array<ComboCourseUpdateWithWhereUniqueWithoutComboInput>;

    @Field(() => [ComboCourseUpdateManyWithWhereWithoutComboInput], {nullable:true})
    @Type(() => ComboCourseUpdateManyWithWhereWithoutComboInput)
    updateMany?: Array<ComboCourseUpdateManyWithWhereWithoutComboInput>;

    @Field(() => [ComboCourseScalarWhereInput], {nullable:true})
    @Type(() => ComboCourseScalarWhereInput)
    deleteMany?: Array<ComboCourseScalarWhereInput>;
}
