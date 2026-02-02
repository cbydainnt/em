import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressCreateWithoutQuizInput } from './user-quiz-progress-create-without-quiz.input';
import { Type } from 'class-transformer';
import { UserQuizProgressCreateOrConnectWithoutQuizInput } from './user-quiz-progress-create-or-connect-without-quiz.input';
import { UserQuizProgressCreateManyQuizInputEnvelope } from './user-quiz-progress-create-many-quiz-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';

@InputType()
export class UserQuizProgressCreateNestedManyWithoutQuizInput {

    @Field(() => [UserQuizProgressCreateWithoutQuizInput], {nullable:true})
    @Type(() => UserQuizProgressCreateWithoutQuizInput)
    create?: Array<UserQuizProgressCreateWithoutQuizInput>;

    @Field(() => [UserQuizProgressCreateOrConnectWithoutQuizInput], {nullable:true})
    @Type(() => UserQuizProgressCreateOrConnectWithoutQuizInput)
    connectOrCreate?: Array<UserQuizProgressCreateOrConnectWithoutQuizInput>;

    @Field(() => UserQuizProgressCreateManyQuizInputEnvelope, {nullable:true})
    @Type(() => UserQuizProgressCreateManyQuizInputEnvelope)
    createMany?: UserQuizProgressCreateManyQuizInputEnvelope;

    @Field(() => [UserQuizProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizProgressWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>>;
}
