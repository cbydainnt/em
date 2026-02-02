import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SectionWhereInput } from './section-where.input';
import { Type } from 'class-transformer';
import { SectionUpdateWithoutLessonsInput } from './section-update-without-lessons.input';

@InputType()
export class SectionUpdateToOneWithWhereWithoutLessonsInput {

    @Field(() => SectionWhereInput, {nullable:true})
    @Type(() => SectionWhereInput)
    where?: SectionWhereInput;

    @Field(() => SectionUpdateWithoutLessonsInput, {nullable:false})
    @Type(() => SectionUpdateWithoutLessonsInput)
    data!: SectionUpdateWithoutLessonsInput;
}
