import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserQuizAnswerCreateselected_answer_idsInput {

    @Field(() => [String], {nullable:false})
    set!: Array<string>;
}
