import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DocumentWhereInput } from './document-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { LessonRelationFilter } from '../lesson/lesson-relation-filter.input';

@InputType()
export class DocumentWhereUniqueInput {

    @Field(() => String, {nullable:true})
    document_id?: string;

    @Field(() => [DocumentWhereInput], {nullable:true})
    AND?: Array<DocumentWhereInput>;

    @Field(() => [DocumentWhereInput], {nullable:true})
    OR?: Array<DocumentWhereInput>;

    @Field(() => [DocumentWhereInput], {nullable:true})
    NOT?: Array<DocumentWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    document_url?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    extension?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    document_name?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    size?: IntFilter;

    @Field(() => BoolFilter, {nullable:true})
    isDownloadable?: BoolFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => StringFilter, {nullable:true})
    lesson_id?: StringFilter;

    @Field(() => LessonRelationFilter, {nullable:true})
    lesson?: LessonRelationFilter;
}
