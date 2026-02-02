import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutAudiosInput } from './quiz-create-without-audios.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutAudiosInput } from './quiz-create-or-connect-without-audios.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';

@InputType()
export class QuizCreateNestedOneWithoutAudiosInput {

    @Field(() => QuizCreateWithoutAudiosInput, {nullable:true})
    @Type(() => QuizCreateWithoutAudiosInput)
    create?: QuizCreateWithoutAudiosInput;

    @Field(() => QuizCreateOrConnectWithoutAudiosInput, {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutAudiosInput)
    connectOrCreate?: QuizCreateOrConnectWithoutAudiosInput;

    @Field(() => QuizWhereUniqueInput, {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;
}
