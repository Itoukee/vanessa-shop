import mongoose, {
  model,
  PassportLocalDocument,
  PassportLocalModel,
  PassportLocalSchema,
  Schema,
} from "mongoose";

export interface IUser extends PassportLocalDocument {
  _id: mongoose.Types.ObjectId;
  email: string;
  firstName?: string;
  lastName?: string;
  birth?: Date;
  password: string;
  superAdmin?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    birth: { type: Date },
    password: { type: String, required: true },
    superAdmin: { type: Boolean },
  },
  { timestamps: true, collection: "User" }
) as PassportLocalSchema;

export interface UserModel<T extends Document> extends PassportLocalModel<T> {}

const User: UserModel<IUser> = model<IUser>("User", userSchema);

export default User;
