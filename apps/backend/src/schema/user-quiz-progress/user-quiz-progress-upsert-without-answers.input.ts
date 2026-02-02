import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressUpdateWithoutAnswersInput } from './user-quiz-progress-update-without-answers.input';
import { Type } from 'class-transformer';
import { UserQuizProgressCreateWithoutAnswersInput } from './user-quiz-progress-create-without-answers.input';
import { UserQuizProgressWhereInput } from './user-quiz-progress-where.input';

@InputType()
export class UserQuizProgressUpsertWithoutAnswersInput {

    @Field(() => UserQuizProgressUpdateWithoutAnswersInput, {nullable:false})
    @Type(() => UserQuizProgressUpdateWithoutAnswersInput)
    update!: UserQuizProgressUpdateWithoutAnswersInput;

    @Field(() => UserQuizProgressCreateWithoutAnswersInput, {nullable:false})
    @Type(() => UserQuizProgressCreateWithoutAnswersInput)
    create!: UserQuizProgressCreateWithoutAnswersInput;

    @Field(() => UserQuizProgressWhereInput, {nullable:true})
    @Type(() => UserQuizProgressWhereInput)
    where?: UserQuizProgressWhereInput;
}
