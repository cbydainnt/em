import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutQuiz_progressInput } from './user-create-without-quiz-progress.input';

@InputType()
export class UserCreateOrConnectWithoutQuiz_progressInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutQuiz_progressInput, {nullable:false})
    @Type(() => UserCreateWithoutQuiz_progressInput)
    create!: UserCreateWithoutQuiz_progressInput;
}
