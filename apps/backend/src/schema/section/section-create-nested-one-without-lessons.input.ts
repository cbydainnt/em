import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SectionCreateWithoutLessonsInput } from './section-create-without-lessons.input';
import { Type } from 'class-transformer';
import { SectionCreateOrConnectWithoutLessonsInput } from './section-create-or-connect-without-lessons.input';
import { Prisma } from '@prisma/client';
import { SectionWhereUniqueInput } from './section-where-unique.input';

@InputType()
export class SectionCreateNestedOneWithoutLessonsInput {

    @Field(() => SectionCreateWithoutLessonsInput, {nullable:true})
    @Type(() => SectionCreateWithoutLessonsInput)
    create?: SectionCreateWithoutLessonsInput;

    @Field(() => SectionCreateOrConnectWithoutLessonsInput, {nullable:true})
    @Type(() => SectionCreateOrConnectWithoutLessonsInput)
    connectOrCreate?: SectionCreateOrConnectWithoutLessonsInput;

    @Field(() => SectionWhereUniqueInput, {nullable:true})
    @Type(() => SectionWhereUniqueInput)
    connect?: Prisma.AtLeast<SectionWhereUniqueInput, 'section_id'>;
}
