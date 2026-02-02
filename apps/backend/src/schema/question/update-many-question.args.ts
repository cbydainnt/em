import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuestionUpdateManyMutationInput } from './question-update-many-mutation.input';
import { Type } from 'class-transformer';
import { QuestionWhereInput } from './question-where.input';

@ArgsType()
export class UpdateManyQuestionArgs {

    @Field(() => QuestionUpdateManyMutationInput, {nullable:false})
    @Type(() => QuestionUpdateManyMutationInput)
    data!: QuestionUpdateManyMutationInput;

    @Field(() => QuestionWhereInput, {nullable:true})
    @Type(() => QuestionWhereInput)
    where?: QuestionWhereInput;
}
