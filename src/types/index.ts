import { Document } from "mongoose";

export interface IUser extends Document{
    name : string;
    email: string;
    password: string;
    role : 'user' | "admin";
    isEmailVerified : boolean;
    emailVerificationToken?: string
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    createdAt : Date;
    updatedAt: Date;

    comparePassword(enteredPassword:String): Promise<boolean>;
    generateAuthToken:string;

}
export interface AuthRequest extends Request {
  user?: IUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}