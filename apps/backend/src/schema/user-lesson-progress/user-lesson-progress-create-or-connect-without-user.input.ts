import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';
import { Type } from 'class-transformer';
import { UserLessonProgressCreateWithoutUserInput } from './user-lesson-progress-create-without-user.input';

@InputType()
export class UserLessonProgressCreateOrConnectWithoutUserInput {

    @Field(() => UserLessonProgressWhereUniqueInput, {nullable:false})
    @Type(() => UserLessonProgressWhereUniqueInput)
    where!: Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>;

    @Field(() => UserLessonProgressCreateWithoutUserInput, {nullable:false})
    @Type(() => UserLessonProgressCreateWithoutUserInput)
    create!: UserLessonProgressCreateWithoutUserInput;
}
