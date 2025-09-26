import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";
import { Model } from "mongoose";
import bcrypt from 'bcryptjs';
//import jwt from 'jsonwebtoken';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { IUser } from "../types";
//import { create } from "domain";
//import { emit } from "process";
//import { Mode } from "fs";

const UserSchema: Schema<IUser> = new Schema({
    "name": {
        type: String, required: [true, "please provide a name"],
        trim: true, maxLength: [50, "name cannot be more than 50 characters"]
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
    
    "isEmailVerified":{
        type: Boolean,
        default: false
    },

    "emailVerificationToken":{
        type: String,
        select: false
    },

    "resetPasswordToken":{
        type: String,
        select: false
    },

    "resetPasswordExpire":{
        type: Date,
        select: false
    },

},
    {
        timestamps: true
    }
)

// Hash password before saving
UserSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
UserSchema.methods.generateAuthToken = function(): string {
    const myJwtSecret = process.env.JWT_SECRET || " "
    const jwtPayload = { 
      id: this._id,
      email: this.email,
      role: this.role 
    }

  const token = jwt.sign( 
    jwtPayload,
    myJwtSecret,

    {
      expiresIn:'7d'
    }
  );
  return token;
};

UserSchema.index({
    email:1
})

UserSchema.index({
    createdAt:-1
})

const UserCollection : Model<IUser> = mongoose.model<IUser>('User',UserSchema);

export default UserCollection;