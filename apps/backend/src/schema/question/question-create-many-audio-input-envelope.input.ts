import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionCreateManyAudioInput } from './question-create-many-audio.input';
import { Type } from 'class-transformer';

@InputType()
export class QuestionCreateManyAudioInputEnvelope {

    @Field(() => [QuestionCreateManyAudioInput], {nullable:false})
    @Type(() => QuestionCreateManyAudioInput)
    data!: Array<QuestionCreateManyAudioInput>;
}
