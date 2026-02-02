import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { ReportUpdateOneRequiredWithoutCommentsNestedInput } from '../report/report-update-one-required-without-comments-nested.input';

@InputType()
export class ReportCommentUpdateWithoutUserInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    content?: StringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => ReportUpdateOneRequiredWithoutCommentsNestedInput, {nullable:true})
    report?: ReportUpdateOneRequiredWithoutCommentsNestedInput;
}
