import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutSectionInput } from './lesson-create-without-section.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutSectionInput } from './lesson-create-or-connect-without-section.input';
import { LessonUpsertWithWhereUniqueWithoutSectionInput } from './lesson-upsert-with-where-unique-without-section.input';
import { LessonCreateManySectionInputEnvelope } from './lesson-create-many-section-input-envelope.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { LessonUpdateWithWhereUniqueWithoutSectionInput } from './lesson-update-with-where-unique-without-section.input';
import { LessonUpdateManyWithWhereWithoutSectionInput } from './lesson-update-many-with-where-without-section.input';
import { LessonScalarWhereInput } from './lesson-scalar-where.input';

@InputType()
export class LessonUpdateManyWithoutSectionNestedInput {

    @Field(() => [LessonCreateWithoutSectionInput], {nullable:true})
    @Type(() => LessonCreateWithoutSectionInput)
    create?: Array<LessonCreateWithoutSectionInput>;

    @Field(() => [LessonCreateOrConnectWithoutSectionInput], {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutSectionInput)
    connectOrCreate?: Array<LessonCreateOrConnectWithoutSectionInput>;

    @Field(() => [LessonUpsertWithWhereUniqueWithoutSectionInput], {nullable:true})
    @Type(() => LessonUpsertWithWhereUniqueWithoutSectionInput)
    upsert?: Array<LessonUpsertWithWhereUniqueWithoutSectionInput>;

    @Field(() => LessonCreateManySectionInputEnvelope, {nullable:true})
    @Type(() => LessonCreateManySectionInputEnvelope)
    createMany?: LessonCreateManySectionInputEnvelope;

    @Field(() => [LessonWhereUniqueInput], {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    set?: Array<Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>>;

    @Field(() => [LessonWhereUniqueInput], {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>>;

    @Field(() => [LessonWhereUniqueInput], {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>>;

    @Field(() => [LessonWhereUniqueInput], {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>>;

    @Field(() => [LessonUpdateWithWhereUniqueWithoutSectionInput], {nullable:true})
    @Type(() => LessonUpdateWithWhereUniqueWithoutSectionInput)
    update?: Array<LessonUpdateWithWhereUniqueWithoutSectionInput>;

    @Field(() => [LessonUpdateManyWithWhereWithoutSectionInput], {nullable:true})
    @Type(() => LessonUpdateManyWithWhereWithoutSectionInput)
    updateMany?: Array<LessonUpdateManyWithWhereWithoutSectionInput>;

    @Field(() => [LessonScalarWhereInput], {nullable:true})
    @Type(() => LessonScalarWhereInput)
    deleteMany?: Array<LessonScalarWhereInput>;
}
