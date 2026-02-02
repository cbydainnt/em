import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressWhereInput } from './user-quiz-progress-where.input';
import { Type } from 'class-transformer';
import { UserQuizProgressUpdateWithoutAnswersInput } from './user-quiz-progress-update-without-answers.input';

@InputType()
export class UserQuizProgressUpdateToOneWithWhereWithoutAnswersInput {

    @Field(() => UserQuizProgressWhereInput, {nullable:true})
    @Type(() => UserQuizProgressWhereInput)
    where?: UserQuizProgressWhereInput;

    @Field(() => UserQuizProgressUpdateWithoutAnswersInput, {nullable:false})
    @Type(() => UserQuizProgressUpdateWithoutAnswersInput)
    data!: UserQuizProgressUpdateWithoutAnswersInput;
}
