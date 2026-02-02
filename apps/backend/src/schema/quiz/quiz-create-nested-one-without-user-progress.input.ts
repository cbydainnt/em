import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutUser_progressInput } from './quiz-create-without-user-progress.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutUser_progressInput } from './quiz-create-or-connect-without-user-progress.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';

@InputType()
export class QuizCreateNestedOneWithoutUser_progressInput {

    @Field(() => QuizCreateWithoutUser_progressInput, {nullable:true})
    @Type(() => QuizCreateWithoutUser_progressInput)
    create?: QuizCreateWithoutUser_progressInput;

    @Field(() => QuizCreateOrConnectWithoutUser_progressInput, {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutUser_progressInput)
    connectOrCreate?: QuizCreateOrConnectWithoutUser_progressInput;

    @Field(() => QuizWhereUniqueInput, {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;
}
