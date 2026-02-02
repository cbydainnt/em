import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { AnswerScalarWhereInput } from './answer-scalar-where.input';
import { Type } from 'class-transformer';
import { AnswerUpdateManyMutationInput } from './answer-update-many-mutation.input';

@InputType()
export class AnswerUpdateManyWithWhereWithoutQuestionInput {

    @Field(() => AnswerScalarWhereInput, {nullable:false})
    @Type(() => AnswerScalarWhereInput)
    where!: AnswerScalarWhereInput;

    @Field(() => AnswerUpdateManyMutationInput, {nullable:false})
    @Type(() => AnswerUpdateManyMutationInput)
    data!: AnswerUpdateManyMutationInput;
}
