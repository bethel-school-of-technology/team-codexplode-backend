import { Document, Schema, Types, model } from 'mongoose';

interface iUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const userSchema: Schema = new Schema<iUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<iUser>('User', userSchema);

export { iUser, User };
