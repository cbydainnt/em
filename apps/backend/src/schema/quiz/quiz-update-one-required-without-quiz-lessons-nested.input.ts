import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutQuiz_lessonsInput } from './quiz-create-without-quiz-lessons.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutQuiz_lessonsInput } from './quiz-create-or-connect-without-quiz-lessons.input';
import { QuizUpsertWithoutQuiz_lessonsInput } from './quiz-upsert-without-quiz-lessons.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { QuizUpdateToOneWithWhereWithoutQuiz_lessonsInput } from './quiz-update-to-one-with-where-without-quiz-lessons.input';

@InputType()
export class QuizUpdateOneRequiredWithoutQuiz_lessonsNestedInput {

    @Field(() => QuizCreateWithoutQuiz_lessonsInput, {nullable:true})
    @Type(() => QuizCreateWithoutQuiz_lessonsInput)
    create?: QuizCreateWithoutQuiz_lessonsInput;

    @Field(() => QuizCreateOrConnectWithoutQuiz_lessonsInput, {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutQuiz_lessonsInput)
    connectOrCreate?: QuizCreateOrConnectWithoutQuiz_lessonsInput;

    @Field(() => QuizUpsertWithoutQuiz_lessonsInput, {nullable:true})
    @Type(() => QuizUpsertWithoutQuiz_lessonsInput)
    upsert?: QuizUpsertWithoutQuiz_lessonsInput;

    @Field(() => QuizWhereUniqueInput, {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizUpdateToOneWithWhereWithoutQuiz_lessonsInput, {nullable:true})
    @Type(() => QuizUpdateToOneWithWhereWithoutQuiz_lessonsInput)
    update?: QuizUpdateToOneWithWhereWithoutQuiz_lessonsInput;
}
