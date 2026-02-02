import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SectionUpdateWithoutLessonsInput } from './section-update-without-lessons.input';
import { Type } from 'class-transformer';
import { SectionCreateWithoutLessonsInput } from './section-create-without-lessons.input';
import { SectionWhereInput } from './section-where.input';

@InputType()
export class SectionUpsertWithoutLessonsInput {

    @Field(() => SectionUpdateWithoutLessonsInput, {nullable:false})
    @Type(() => SectionUpdateWithoutLessonsInput)
    update!: SectionUpdateWithoutLessonsInput;

    @Field(() => SectionCreateWithoutLessonsInput, {nullable:false})
    @Type(() => SectionCreateWithoutLessonsInput)
    create!: SectionCreateWithoutLessonsInput;

    @Field(() => SectionWhereInput, {nullable:true})
    @Type(() => SectionWhereInput)
    where?: SectionWhereInput;
}
