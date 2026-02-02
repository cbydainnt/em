import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionScalarWhereInput } from './question-scalar-where.input';
import { Type } from 'class-transformer';
import { QuestionUpdateManyMutationInput } from './question-update-many-mutation.input';

@InputType()
export class QuestionUpdateManyWithWhereWithoutReading_passageInput {

    @Field(() => QuestionScalarWhereInput, {nullable:false})
    @Type(() => QuestionScalarWhereInput)
    where!: QuestionScalarWhereInput;

    @Field(() => QuestionUpdateManyMutationInput, {nullable:false})
    @Type(() => QuestionUpdateManyMutationInput)
    data!: QuestionUpdateManyMutationInput;
}
