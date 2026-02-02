import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutQuiz_progressInput } from './user-update-without-quiz-progress.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutQuiz_progressInput } from './user-create-without-quiz-progress.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutQuiz_progressInput {

    @Field(() => UserUpdateWithoutQuiz_progressInput, {nullable:false})
    @Type(() => UserUpdateWithoutQuiz_progressInput)
    update!: UserUpdateWithoutQuiz_progressInput;

    @Field(() => UserCreateWithoutQuiz_progressInput, {nullable:false})
    @Type(() => UserCreateWithoutQuiz_progressInput)
    create!: UserCreateWithoutQuiz_progressInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
