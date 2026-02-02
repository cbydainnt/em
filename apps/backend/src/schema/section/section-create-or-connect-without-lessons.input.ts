import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { SectionWhereUniqueInput } from './section-where-unique.input';
import { Type } from 'class-transformer';
import { SectionCreateWithoutLessonsInput } from './section-create-without-lessons.input';

@InputType()
export class SectionCreateOrConnectWithoutLessonsInput {

    @Field(() => SectionWhereUniqueInput, {nullable:false})
    @Type(() => SectionWhereUniqueInput)
    where!: Prisma.AtLeast<SectionWhereUniqueInput, 'section_id'>;

    @Field(() => SectionCreateWithoutLessonsInput, {nullable:false})
    @Type(() => SectionCreateWithoutLessonsInput)
    create!: SectionCreateWithoutLessonsInput;
}
