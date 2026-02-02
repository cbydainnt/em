import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutQuiz_progressInput } from './user-create-without-quiz-progress.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutQuiz_progressInput } from './user-create-or-connect-without-quiz-progress.input';
import { UserUpsertWithoutQuiz_progressInput } from './user-upsert-without-quiz-progress.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutQuiz_progressInput } from './user-update-to-one-with-where-without-quiz-progress.input';

@InputType()
export class UserUpdateOneRequiredWithoutQuiz_progressNestedInput {

    @Field(() => UserCreateWithoutQuiz_progressInput, {nullable:true})
    @Type(() => UserCreateWithoutQuiz_progressInput)
    create?: UserCreateWithoutQuiz_progressInput;

    @Field(() => UserCreateOrConnectWithoutQuiz_progressInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutQuiz_progressInput)
    connectOrCreate?: UserCreateOrConnectWithoutQuiz_progressInput;

    @Field(() => UserUpsertWithoutQuiz_progressInput, {nullable:true})
    @Type(() => UserUpsertWithoutQuiz_progressInput)
    upsert?: UserUpsertWithoutQuiz_progressInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutQuiz_progressInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutQuiz_progressInput)
    update?: UserUpdateToOneWithWhereWithoutQuiz_progressInput;
}
