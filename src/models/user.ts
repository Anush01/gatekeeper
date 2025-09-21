import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from "../types";
import { create } from "domain";

const userSchema: Schema<IUser> = new Schema({
    "name": {
        type: String, required: [true, "please provide a name"],
        trim: true, maxLength: [50, "name cannot be more than 5o characters"]
    },
    "email": {
        type: String, required: [true, "please provide an email"],
        unique: true, lowercase: true, trim: true, match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    "password": {
        type: String, required : [true, "please provide a password"],
        select: false
    },
    "role": {
        type: String, 
        enum : ["user", "admin"],
        default: "user"
    },
    

})