import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressCreateWithoutAnswersInput } from './user-quiz-progress-create-without-answers.input';
import { Type } from 'class-transformer';
import { UserQuizProgressCreateOrConnectWithoutAnswersInput } from './user-quiz-progress-create-or-connect-without-answers.input';
import { UserQuizProgressUpsertWithoutAnswersInput } from './user-quiz-progress-upsert-without-answers.input';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';
import { UserQuizProgressUpdateToOneWithWhereWithoutAnswersInput } from './user-quiz-progress-update-to-one-with-where-without-answers.input';

@InputType()
export class UserQuizProgressUpdateOneRequiredWithoutAnswersNestedInput {

    @Field(() => UserQuizProgressCreateWithoutAnswersInput, {nullable:true})
    @Type(() => UserQuizProgressCreateWithoutAnswersInput)
    create?: UserQuizProgressCreateWithoutAnswersInput;

    @Field(() => UserQuizProgressCreateOrConnectWithoutAnswersInput, {nullable:true})
    @Type(() => UserQuizProgressCreateOrConnectWithoutAnswersInput)
    connectOrCreate?: UserQuizProgressCreateOrConnectWithoutAnswersInput;

    @Field(() => UserQuizProgressUpsertWithoutAnswersInput, {nullable:true})
    @Type(() => UserQuizProgressUpsertWithoutAnswersInput)
    upsert?: UserQuizProgressUpsertWithoutAnswersInput;

    @Field(() => UserQuizProgressWhereUniqueInput, {nullable:true})
    @Type(() => UserQuizProgressWhereUniqueInput)
    connect?: Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>;

    @Field(() => UserQuizProgressUpdateToOneWithWhereWithoutAnswersInput, {nullable:true})
    @Type(() => UserQuizProgressUpdateToOneWithWhereWithoutAnswersInput)
    update?: UserQuizProgressUpdateToOneWithWhereWithoutAnswersInput;
}
