import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionCreateManyReading_passageInput } from './question-create-many-reading-passage.input';
import { Type } from 'class-transformer';

@InputType()
export class QuestionCreateManyReading_passageInputEnvelope {

    @Field(() => [QuestionCreateManyReading_passageInput], {nullable:false})
    @Type(() => QuestionCreateManyReading_passageInput)
    data!: Array<QuestionCreateManyReading_passageInput>;
}
