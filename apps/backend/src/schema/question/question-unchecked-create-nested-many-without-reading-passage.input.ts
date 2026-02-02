import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionCreateWithoutReading_passageInput } from './question-create-without-reading-passage.input';
import { Type } from 'class-transformer';
import { QuestionCreateOrConnectWithoutReading_passageInput } from './question-create-or-connect-without-reading-passage.input';
import { QuestionCreateManyReading_passageInputEnvelope } from './question-create-many-reading-passage-input-envelope.input';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';

@InputType()
export class QuestionUncheckedCreateNestedManyWithoutReading_passageInput {

    @Field(() => [QuestionCreateWithoutReading_passageInput], {nullable:true})
    @Type(() => QuestionCreateWithoutReading_passageInput)
    create?: Array<QuestionCreateWithoutReading_passageInput>;

    @Field(() => [QuestionCreateOrConnectWithoutReading_passageInput], {nullable:true})
    @Type(() => QuestionCreateOrConnectWithoutReading_passageInput)
    connectOrCreate?: Array<QuestionCreateOrConnectWithoutReading_passageInput>;

    @Field(() => QuestionCreateManyReading_passageInputEnvelope, {nullable:true})
    @Type(() => QuestionCreateManyReading_passageInputEnvelope)
    createMany?: QuestionCreateManyReading_passageInputEnvelope;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;
}
