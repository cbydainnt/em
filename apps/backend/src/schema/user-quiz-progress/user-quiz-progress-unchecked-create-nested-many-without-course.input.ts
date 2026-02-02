import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressCreateWithoutCourseInput } from './user-quiz-progress-create-without-course.input';
import { Type } from 'class-transformer';
import { UserQuizProgressCreateOrConnectWithoutCourseInput } from './user-quiz-progress-create-or-connect-without-course.input';
import { UserQuizProgressCreateManyCourseInputEnvelope } from './user-quiz-progress-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';

@InputType()
export class UserQuizProgressUncheckedCreateNestedManyWithoutCourseInput {

    @Field(() => [UserQuizProgressCreateWithoutCourseInput], {nullable:true})
    @Type(() => UserQuizProgressCreateWithoutCourseInput)
    create?: Array<UserQuizProgressCreateWithoutCourseInput>;

    @Field(() => [UserQuizProgressCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => UserQuizProgressCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<UserQuizProgressCreateOrConnectWithoutCourseInput>;

    @Field(() => UserQuizProgressCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => UserQuizProgressCreateManyCourseInputEnvelope)
    createMany?: UserQuizProgressCreateManyCourseInputEnvelope;

    @Field(() => [UserQuizProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizProgressWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>>;
}
