import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateManySectionInput } from './lesson-create-many-section.input';
import { Type } from 'class-transformer';

@InputType()
export class LessonCreateManySectionInputEnvelope {

    @Field(() => [LessonCreateManySectionInput], {nullable:false})
    @Type(() => LessonCreateManySectionInput)
    data!: Array<LessonCreateManySectionInput>;
}
