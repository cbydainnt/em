import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionCreateWithoutReading_passageInput } from './question-create-without-reading-passage.input';
import { Type } from 'class-transformer';
import { QuestionCreateOrConnectWithoutReading_passageInput } from './question-create-or-connect-without-reading-passage.input';
import { QuestionUpsertWithWhereUniqueWithoutReading_passageInput } from './question-upsert-with-where-unique-without-reading-passage.input';
import { QuestionCreateManyReading_passageInputEnvelope } from './question-create-many-reading-passage-input-envelope.input';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { QuestionUpdateWithWhereUniqueWithoutReading_passageInput } from './question-update-with-where-unique-without-reading-passage.input';
import { QuestionUpdateManyWithWhereWithoutReading_passageInput } from './question-update-many-with-where-without-reading-passage.input';
import { QuestionScalarWhereInput } from './question-scalar-where.input';

@InputType()
export class QuestionUpdateManyWithoutReading_passageNestedInput {

    @Field(() => [QuestionCreateWithoutReading_passageInput], {nullable:true})
    @Type(() => QuestionCreateWithoutReading_passageInput)
    create?: Array<QuestionCreateWithoutReading_passageInput>;

    @Field(() => [QuestionCreateOrConnectWithoutReading_passageInput], {nullable:true})
    @Type(() => QuestionCreateOrConnectWithoutReading_passageInput)
    connectOrCreate?: Array<QuestionCreateOrConnectWithoutReading_passageInput>;

    @Field(() => [QuestionUpsertWithWhereUniqueWithoutReading_passageInput], {nullable:true})
    @Type(() => QuestionUpsertWithWhereUniqueWithoutReading_passageInput)
    upsert?: Array<QuestionUpsertWithWhereUniqueWithoutReading_passageInput>;

    @Field(() => QuestionCreateManyReading_passageInputEnvelope, {nullable:true})
    @Type(() => QuestionCreateManyReading_passageInputEnvelope)
    createMany?: QuestionCreateManyReading_passageInputEnvelope;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    set?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;

    @Field(() => [QuestionUpdateWithWhereUniqueWithoutReading_passageInput], {nullable:true})
    @Type(() => QuestionUpdateWithWhereUniqueWithoutReading_passageInput)
    update?: Array<QuestionUpdateWithWhereUniqueWithoutReading_passageInput>;

    @Field(() => [QuestionUpdateManyWithWhereWithoutReading_passageInput], {nullable:true})
    @Type(() => QuestionUpdateManyWithWhereWithoutReading_passageInput)
    updateMany?: Array<QuestionUpdateManyWithWhereWithoutReading_passageInput>;

    @Field(() => [QuestionScalarWhereInput], {nullable:true})
    @Type(() => QuestionScalarWhereInput)
    deleteMany?: Array<QuestionScalarWhereInput>;
}
