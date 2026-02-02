import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class DocumentMinAggregate {

    @Field(() => String, {nullable:true})
    document_id?: string;

    @Field(() => String, {nullable:true})
    document_url?: string;

    @Field(() => String, {nullable:true})
    extension?: string;

    @Field(() => String, {nullable:true})
    document_name?: string;

    @Field(() => Int, {nullable:true})
    size?: number;

    @Field(() => Boolean, {nullable:true})
    isDownloadable?: boolean;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => String, {nullable:true})
    lesson_id?: string;
}
