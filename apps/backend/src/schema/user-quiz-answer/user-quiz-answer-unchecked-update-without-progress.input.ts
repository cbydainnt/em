import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserQuizAnswerUpdateselected_answer_idsInput } from './user-quiz-answer-updateselected-answer-ids.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { FloatFieldUpdateOperationsInput } from '../prisma/float-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';

@InputType()
export class UserQuizAnswerUncheckedUpdateWithoutProgressInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    question_id?: StringFieldUpdateOperationsInput;

    @Field(() => UserQuizAnswerUpdateselected_answer_idsInput, {nullable:true})
    selected_answer_ids?: UserQuizAnswerUpdateselected_answer_idsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    answer_text?: NullableStringFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    is_correct?: BoolFieldUpdateOperationsInput;

    @Field(() => FloatFieldUpdateOperationsInput, {nullable:true})
    points_earned?: FloatFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    time_spent?: NullableIntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;
}
