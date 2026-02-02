import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class DocumentUncheckedCreateInput {

    @Field(() => String, {nullable:true})
    document_id?: string;

    @Field(() => String, {nullable:false})
    document_url!: string;

    @Field(() => String, {nullable:false})
    extension!: string;

    @Field(() => String, {nullable:false})
    document_name!: string;

    @Field(() => Int, {nullable:true})
    size?: number;

    @Field(() => Boolean, {nullable:true})
    isDownloadable?: boolean;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => String, {nullable:false})
    lesson_id!: string;
}
