import { Model } from "mongoose";

export type TUser = {
    name:string,
    email:string,
    password: string,
    role: 'user' | 'admin'
}

export interface UserModel extends Model<TUser> {
    isUserExists(email: string): Promise<TUser | null>;
    isPasswordMatch(
        plainTextPassword: string,
        hashedPassword: string,
      ): Promise<boolean>;
      isJWTIssuedBefforePasswordChanged(
        passwordChangedTimestamp: Date,
    JWTIssuedTimestamp: number,
      ): Promise<boolean>
  }
