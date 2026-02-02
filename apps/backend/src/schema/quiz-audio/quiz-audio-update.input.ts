import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { GraphQLJSON } from 'graphql-type-json';
import { QuizUpdateOneRequiredWithoutAudiosNestedInput } from '../quiz/quiz-update-one-required-without-audios-nested.input';
import { QuestionUpdateManyWithoutAudioNestedInput } from '../question/question-update-many-without-audio-nested.input';

@InputType()
export class QuizAudioUpdateInput {

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    title?: NullableStringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    audio_url?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    file_name?: StringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    duration_seconds?: IntFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    transcript?: NullableStringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    total_questions?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => GraphQLJSON, {nullable:true})
    question_ordering?: any;

    @Field(() => QuizUpdateOneRequiredWithoutAudiosNestedInput, {nullable:true})
    quiz?: QuizUpdateOneRequiredWithoutAudiosNestedInput;

    @Field(() => QuestionUpdateManyWithoutAudioNestedInput, {nullable:true})
    questions?: QuestionUpdateManyWithoutAudioNestedInput;
}
