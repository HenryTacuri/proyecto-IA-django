import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.entity";
import mongoose from "mongoose";


@Schema()
export class Preference {

    _id?: string;

    @Prop({minlength: 3, required: true}) 
    make: string;

    @Prop({minlength: 3, required: true}) 
    model: string;

    @Prop({minlength: 3, required: true}) 
    fuel: string;

    @Prop({minlength: 3, required: true}) 
    color: string;

    @Prop({minlength: 3, required: true}) 
    shift: string;

    @Prop({min: 3, required: true}) 
    price: number;

    @Prop({min: 3, required: true}) 
    year: number;

    @Prop({min: 3, required: true}) 
    power: number;

    @Prop({min: 3, required: true}) 
    doors: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}) 
    user: User;
}

export const PreferenceSchema = SchemaFactory.createForClass(Preference);