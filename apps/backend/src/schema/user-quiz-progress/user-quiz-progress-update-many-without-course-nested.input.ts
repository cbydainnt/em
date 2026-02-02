import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressCreateWithoutCourseInput } from './user-quiz-progress-create-without-course.input';
import { Type } from 'class-transformer';
import { UserQuizProgressCreateOrConnectWithoutCourseInput } from './user-quiz-progress-create-or-connect-without-course.input';
import { UserQuizProgressUpsertWithWhereUniqueWithoutCourseInput } from './user-quiz-progress-upsert-with-where-unique-without-course.input';
import { UserQuizProgressCreateManyCourseInputEnvelope } from './user-quiz-progress-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';
import { UserQuizProgressUpdateWithWhereUniqueWithoutCourseInput } from './user-quiz-progress-update-with-where-unique-without-course.input';
import { UserQuizProgressUpdateManyWithWhereWithoutCourseInput } from './user-quiz-progress-update-many-with-where-without-course.input';
import { UserQuizProgressScalarWhereInput } from './user-quiz-progress-scalar-where.input';

@InputType()
export class UserQuizProgressUpdateManyWithoutCourseNestedInput {

    @Field(() => [UserQuizProgressCreateWithoutCourseInput], {nullable:true})
    @Type(() => UserQuizProgressCreateWithoutCourseInput)
    create?: Array<UserQuizProgressCreateWithoutCourseInput>;

    @Field(() => [UserQuizProgressCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => UserQuizProgressCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<UserQuizProgressCreateOrConnectWithoutCourseInput>;

    @Field(() => [UserQuizProgressUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => UserQuizProgressUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<UserQuizProgressUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => UserQuizProgressCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => UserQuizProgressCreateManyCourseInputEnvelope)
    createMany?: UserQuizProgressCreateManyCourseInputEnvelope;

    @Field(() => [UserQuizProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizProgressWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>>;

    @Field(() => [UserQuizProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizProgressWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>>;

    @Field(() => [UserQuizProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizProgressWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>>;

    @Field(() => [UserQuizProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizProgressWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>>;

    @Field(() => [UserQuizProgressUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => UserQuizProgressUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<UserQuizProgressUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [UserQuizProgressUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => UserQuizProgressUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<UserQuizProgressUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [UserQuizProgressScalarWhereInput], {nullable:true})
    @Type(() => UserQuizProgressScalarWhereInput)
    deleteMany?: Array<UserQuizProgressScalarWhereInput>;
}
