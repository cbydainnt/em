import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DocumentCreateManyLessonInput } from './document-create-many-lesson.input';
import { Type } from 'class-transformer';

@InputType()
export class DocumentCreateManyLessonInputEnvelope {

    @Field(() => [DocumentCreateManyLessonInput], {nullable:false})
    @Type(() => DocumentCreateManyLessonInput)
    data!: Array<DocumentCreateManyLessonInput>;
}
