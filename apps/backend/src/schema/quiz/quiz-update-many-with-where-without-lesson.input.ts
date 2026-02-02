import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizScalarWhereInput } from './quiz-scalar-where.input';
import { Type } from 'class-transformer';
import { QuizUpdateManyMutationInput } from './quiz-update-many-mutation.input';

@InputType()
export class QuizUpdateManyWithWhereWithoutLessonInput {

    @Field(() => QuizScalarWhereInput, {nullable:false})
    @Type(() => QuizScalarWhereInput)
    where!: QuizScalarWhereInput;

    @Field(() => QuizUpdateManyMutationInput, {nullable:false})
    @Type(() => QuizUpdateManyMutationInput)
    data!: QuizUpdateManyMutationInput;
}
