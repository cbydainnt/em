import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserQuizAnswerProgress_idQuestion_idCompoundUniqueInput {

    @Field(() => String, {nullable:false})
    progress_id!: string;

    @Field(() => String, {nullable:false})
    question_id!: string;
}
