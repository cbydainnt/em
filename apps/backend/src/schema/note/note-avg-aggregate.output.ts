import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class NoteAvgAggregate {

    @Field(() => Float, {nullable:true})
    timestamp?: number;
}
