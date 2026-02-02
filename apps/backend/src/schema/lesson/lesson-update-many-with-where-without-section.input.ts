import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonScalarWhereInput } from './lesson-scalar-where.input';
import { Type } from 'class-transformer';
import { LessonUpdateManyMutationInput } from './lesson-update-many-mutation.input';

@InputType()
export class LessonUpdateManyWithWhereWithoutSectionInput {

    @Field(() => LessonScalarWhereInput, {nullable:false})
    @Type(() => LessonScalarWhereInput)
    where!: LessonScalarWhereInput;

    @Field(() => LessonUpdateManyMutationInput, {nullable:false})
    @Type(() => LessonUpdateManyMutationInput)
    data!: LessonUpdateManyMutationInput;
}
