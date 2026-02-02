import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutUser_progressInput } from './quiz-create-without-user-progress.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutUser_progressInput } from './quiz-create-or-connect-without-user-progress.input';
import { QuizUpsertWithoutUser_progressInput } from './quiz-upsert-without-user-progress.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { QuizUpdateToOneWithWhereWithoutUser_progressInput } from './quiz-update-to-one-with-where-without-user-progress.input';

@InputType()
export class QuizUpdateOneRequiredWithoutUser_progressNestedInput {

    @Field(() => QuizCreateWithoutUser_progressInput, {nullable:true})
    @Type(() => QuizCreateWithoutUser_progressInput)
    create?: QuizCreateWithoutUser_progressInput;

    @Field(() => QuizCreateOrConnectWithoutUser_progressInput, {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutUser_progressInput)
    connectOrCreate?: QuizCreateOrConnectWithoutUser_progressInput;

    @Field(() => QuizUpsertWithoutUser_progressInput, {nullable:true})
    @Type(() => QuizUpsertWithoutUser_progressInput)
    upsert?: QuizUpsertWithoutUser_progressInput;

    @Field(() => QuizWhereUniqueInput, {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizUpdateToOneWithWhereWithoutUser_progressInput, {nullable:true})
    @Type(() => QuizUpdateToOneWithWhereWithoutUser_progressInput)
    update?: QuizUpdateToOneWithWhereWithoutUser_progressInput;
}
