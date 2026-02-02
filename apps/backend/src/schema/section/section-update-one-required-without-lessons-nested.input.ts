import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SectionCreateWithoutLessonsInput } from './section-create-without-lessons.input';
import { Type } from 'class-transformer';
import { SectionCreateOrConnectWithoutLessonsInput } from './section-create-or-connect-without-lessons.input';
import { SectionUpsertWithoutLessonsInput } from './section-upsert-without-lessons.input';
import { Prisma } from '@prisma/client';
import { SectionWhereUniqueInput } from './section-where-unique.input';
import { SectionUpdateToOneWithWhereWithoutLessonsInput } from './section-update-to-one-with-where-without-lessons.input';

@InputType()
export class SectionUpdateOneRequiredWithoutLessonsNestedInput {

    @Field(() => SectionCreateWithoutLessonsInput, {nullable:true})
    @Type(() => SectionCreateWithoutLessonsInput)
    create?: SectionCreateWithoutLessonsInput;

    @Field(() => SectionCreateOrConnectWithoutLessonsInput, {nullable:true})
    @Type(() => SectionCreateOrConnectWithoutLessonsInput)
    connectOrCreate?: SectionCreateOrConnectWithoutLessonsInput;

    @Field(() => SectionUpsertWithoutLessonsInput, {nullable:true})
    @Type(() => SectionUpsertWithoutLessonsInput)
    upsert?: SectionUpsertWithoutLessonsInput;

    @Field(() => SectionWhereUniqueInput, {nullable:true})
    @Type(() => SectionWhereUniqueInput)
    connect?: Prisma.AtLeast<SectionWhereUniqueInput, 'section_id'>;

    @Field(() => SectionUpdateToOneWithWhereWithoutLessonsInput, {nullable:true})
    @Type(() => SectionUpdateToOneWithWhereWithoutLessonsInput)
    update?: SectionUpdateToOneWithWhereWithoutLessonsInput;
}
