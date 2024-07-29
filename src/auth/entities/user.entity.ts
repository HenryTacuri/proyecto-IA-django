import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    _id?: string;
    @Prop({unique: true, required: true}) 
    email:      string;
    
    @Prop({unique: true})
    name:       string;

    @Prop({minlength: 6, required: true})
    password?:   string;

    @Prop({required: true, default: 'user'})
    rol:   string;
}


export const UserSchema = SchemaFactory.createForClass(User);