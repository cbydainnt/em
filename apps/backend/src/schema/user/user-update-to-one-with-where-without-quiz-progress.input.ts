import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutQuiz_progressInput } from './user-update-without-quiz-progress.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutQuiz_progressInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutQuiz_progressInput, {nullable:false})
    @Type(() => UserUpdateWithoutQuiz_progressInput)
    data!: UserUpdateWithoutQuiz_progressInput;
}
