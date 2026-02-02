import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ReportCreatescreenshot_urlsInput {

    @Field(() => [String], {nullable:false})
    set!: Array<string>;
}
