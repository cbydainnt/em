import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserLessonProgressCreateWithoutUserInput } from './user-lesson-progress-create-without-user.input';
import { Type } from 'class-transformer';
import { UserLessonProgressCreateOrConnectWithoutUserInput } from './user-lesson-progress-create-or-connect-without-user.input';
import { UserLessonProgressCreateManyUserInputEnvelope } from './user-lesson-progress-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';

@InputType()
export class UserLessonProgressCreateNestedManyWithoutUserInput {

    @Field(() => [UserLessonProgressCreateWithoutUserInput], {nullable:true})
    @Type(() => UserLessonProgressCreateWithoutUserInput)
    create?: Array<UserLessonProgressCreateWithoutUserInput>;

    @Field(() => [UserLessonProgressCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserLessonProgressCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserLessonProgressCreateOrConnectWithoutUserInput>;

    @Field(() => UserLessonProgressCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserLessonProgressCreateManyUserInputEnvelope)
    createMany?: UserLessonProgressCreateManyUserInputEnvelope;

    @Field(() => [UserLessonProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserLessonProgressWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>>;
}
