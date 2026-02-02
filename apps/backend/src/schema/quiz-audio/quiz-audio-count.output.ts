import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class QuizAudioCount {

    @Field(() => Int, {nullable:false})
    questions?: number;
}
