import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserLessonProgressCreateWithoutLessonInput } from './user-lesson-progress-create-without-lesson.input';
import { Type } from 'class-transformer';
import { UserLessonProgressCreateOrConnectWithoutLessonInput } from './user-lesson-progress-create-or-connect-without-lesson.input';
import { UserLessonProgressCreateManyLessonInputEnvelope } from './user-lesson-progress-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';

@InputType()
export class UserLessonProgressUncheckedCreateNestedManyWithoutLessonInput {

    @Field(() => [UserLessonProgressCreateWithoutLessonInput], {nullable:true})
    @Type(() => UserLessonProgressCreateWithoutLessonInput)
    create?: Array<UserLessonProgressCreateWithoutLessonInput>;

    @Field(() => [UserLessonProgressCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => UserLessonProgressCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<UserLessonProgressCreateOrConnectWithoutLessonInput>;

    @Field(() => UserLessonProgressCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => UserLessonProgressCreateManyLessonInputEnvelope)
    createMany?: UserLessonProgressCreateManyLessonInputEnvelope;

    @Field(() => [UserLessonProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserLessonProgressWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>>;
}
