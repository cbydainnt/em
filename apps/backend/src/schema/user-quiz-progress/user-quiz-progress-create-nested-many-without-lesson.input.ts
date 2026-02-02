import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressCreateWithoutLessonInput } from './user-quiz-progress-create-without-lesson.input';
import { Type } from 'class-transformer';
import { UserQuizProgressCreateOrConnectWithoutLessonInput } from './user-quiz-progress-create-or-connect-without-lesson.input';
import { UserQuizProgressCreateManyLessonInputEnvelope } from './user-quiz-progress-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';

@InputType()
export class UserQuizProgressCreateNestedManyWithoutLessonInput {

    @Field(() => [UserQuizProgressCreateWithoutLessonInput], {nullable:true})
    @Type(() => UserQuizProgressCreateWithoutLessonInput)
    create?: Array<UserQuizProgressCreateWithoutLessonInput>;

    @Field(() => [UserQuizProgressCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => UserQuizProgressCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<UserQuizProgressCreateOrConnectWithoutLessonInput>;

    @Field(() => UserQuizProgressCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => UserQuizProgressCreateManyLessonInputEnvelope)
    createMany?: UserQuizProgressCreateManyLessonInputEnvelope;

    @Field(() => [UserQuizProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizProgressWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>>;
}
