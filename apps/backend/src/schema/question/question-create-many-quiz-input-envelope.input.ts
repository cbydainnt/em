import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionCreateManyQuizInput } from './question-create-many-quiz.input';
import { Type } from 'class-transformer';

@InputType()
export class QuestionCreateManyQuizInputEnvelope {

    @Field(() => [QuestionCreateManyQuizInput], {nullable:false})
    @Type(() => QuestionCreateManyQuizInput)
    data!: Array<QuestionCreateManyQuizInput>;
}
