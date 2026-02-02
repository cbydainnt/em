import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { Type } from 'class-transformer';
import { QuizCreateWithoutAudiosInput } from './quiz-create-without-audios.input';

@InputType()
export class QuizCreateOrConnectWithoutAudiosInput {

    @Field(() => QuizWhereUniqueInput, {nullable:false})
    @Type(() => QuizWhereUniqueInput)
    where!: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizCreateWithoutAudiosInput, {nullable:false})
    @Type(() => QuizCreateWithoutAudiosInput)
    create!: QuizCreateWithoutAudiosInput;
}
