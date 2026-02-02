import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DocumentMaxAggregateInput {

    @Field(() => Boolean, {nullable:true})
    document_id?: true;

    @Field(() => Boolean, {nullable:true})
    document_url?: true;

    @Field(() => Boolean, {nullable:true})
    extension?: true;

    @Field(() => Boolean, {nullable:true})
    document_name?: true;

    @Field(() => Boolean, {nullable:true})
    size?: true;

    @Field(() => Boolean, {nullable:true})
    isDownloadable?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    lesson_id?: true;
}
