import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutAudiosInput } from './quiz-create-without-audios.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutAudiosInput } from './quiz-create-or-connect-without-audios.input';
import { QuizUpsertWithoutAudiosInput } from './quiz-upsert-without-audios.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { QuizUpdateToOneWithWhereWithoutAudiosInput } from './quiz-update-to-one-with-where-without-audios.input';

@InputType()
export class QuizUpdateOneRequiredWithoutAudiosNestedInput {

    @Field(() => QuizCreateWithoutAudiosInput, {nullable:true})
    @Type(() => QuizCreateWithoutAudiosInput)
    create?: QuizCreateWithoutAudiosInput;

    @Field(() => QuizCreateOrConnectWithoutAudiosInput, {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutAudiosInput)
    connectOrCreate?: QuizCreateOrConnectWithoutAudiosInput;

    @Field(() => QuizUpsertWithoutAudiosInput, {nullable:true})
    @Type(() => QuizUpsertWithoutAudiosInput)
    upsert?: QuizUpsertWithoutAudiosInput;

    @Field(() => QuizWhereUniqueInput, {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizUpdateToOneWithWhereWithoutAudiosInput, {nullable:true})
    @Type(() => QuizUpdateToOneWithWhereWithoutAudiosInput)
    update?: QuizUpdateToOneWithWhereWithoutAudiosInput;
}
