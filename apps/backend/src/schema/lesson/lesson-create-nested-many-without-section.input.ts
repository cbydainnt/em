import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutSectionInput } from './lesson-create-without-section.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutSectionInput } from './lesson-create-or-connect-without-section.input';
import { LessonCreateManySectionInputEnvelope } from './lesson-create-many-section-input-envelope.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';

@InputType()
export class LessonCreateNestedManyWithoutSectionInput {

    @Field(() => [LessonCreateWithoutSectionInput], {nullable:true})
    @Type(() => LessonCreateWithoutSectionInput)
    create?: Array<LessonCreateWithoutSectionInput>;

    @Field(() => [LessonCreateOrConnectWithoutSectionInput], {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutSectionInput)
    connectOrCreate?: Array<LessonCreateOrConnectWithoutSectionInput>;

    @Field(() => LessonCreateManySectionInputEnvelope, {nullable:true})
    @Type(() => LessonCreateManySectionInputEnvelope)
    createMany?: LessonCreateManySectionInputEnvelope;

    @Field(() => [LessonWhereUniqueInput], {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>>;
}
