import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressCreateWithoutLessonInput } from './user-quiz-progress-create-without-lesson.input';
import { Type } from 'class-transformer';
import { UserQuizProgressCreateOrConnectWithoutLessonInput } from './user-quiz-progress-create-or-connect-without-lesson.input';
import { UserQuizProgressUpsertWithWhereUniqueWithoutLessonInput } from './user-quiz-progress-upsert-with-where-unique-without-lesson.input';
import { UserQuizProgressCreateManyLessonInputEnvelope } from './user-quiz-progress-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';
import { UserQuizProgressUpdateWithWhereUniqueWithoutLessonInput } from './user-quiz-progress-update-with-where-unique-without-lesson.input';
import { UserQuizProgressUpdateManyWithWhereWithoutLessonInput } from './user-quiz-progress-update-many-with-where-without-lesson.input';
import { UserQuizProgressScalarWhereInput } from './user-quiz-progress-scalar-where.input';

@InputType()
export class UserQuizProgressUncheckedUpdateManyWithoutLessonNestedInput {

    @Field(() => [UserQuizProgressCreateWithoutLessonInput], {nullable:true})
    @Type(() => UserQuizProgressCreateWithoutLessonInput)
    create?: Array<UserQuizProgressCreateWithoutLessonInput>;

    @Field(() => [UserQuizProgressCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => UserQuizProgressCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<UserQuizProgressCreateOrConnectWithoutLessonInput>;

    @Field(() => [UserQuizProgressUpsertWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => UserQuizProgressUpsertWithWhereUniqueWithoutLessonInput)
    upsert?: Array<UserQuizProgressUpsertWithWhereUniqueWithoutLessonInput>;

    @Field(() => UserQuizProgressCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => UserQuizProgressCreateManyLessonInputEnvelope)
    createMany?: UserQuizProgressCreateManyLessonInputEnvelope;

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

    @Field(() => [UserQuizProgressUpdateWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => UserQuizProgressUpdateWithWhereUniqueWithoutLessonInput)
    update?: Array<UserQuizProgressUpdateWithWhereUniqueWithoutLessonInput>;

    @Field(() => [UserQuizProgressUpdateManyWithWhereWithoutLessonInput], {nullable:true})
    @Type(() => UserQuizProgressUpdateManyWithWhereWithoutLessonInput)
    updateMany?: Array<UserQuizProgressUpdateManyWithWhereWithoutLessonInput>;

    @Field(() => [UserQuizProgressScalarWhereInput], {nullable:true})
    @Type(() => UserQuizProgressScalarWhereInput)
    deleteMany?: Array<UserQuizProgressScalarWhereInput>;
}
