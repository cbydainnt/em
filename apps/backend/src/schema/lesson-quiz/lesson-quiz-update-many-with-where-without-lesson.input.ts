import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonQuizScalarWhereInput } from './lesson-quiz-scalar-where.input';
import { Type } from 'class-transformer';
import { LessonQuizUpdateManyMutationInput } from './lesson-quiz-update-many-mutation.input';

@InputType()
export class LessonQuizUpdateManyWithWhereWithoutLessonInput {

    @Field(() => LessonQuizScalarWhereInput, {nullable:false})
    @Type(() => LessonQuizScalarWhereInput)
    where!: LessonQuizScalarWhereInput;

    @Field(() => LessonQuizUpdateManyMutationInput, {nullable:false})
    @Type(() => LessonQuizUpdateManyMutationInput)
    data!: LessonQuizUpdateManyMutationInput;
}
