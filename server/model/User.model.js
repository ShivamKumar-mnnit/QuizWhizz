import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a unique Username"],
    unique: [true, "Username exists"],
  },
  password: {
    type: String,
    required: [false, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
  role: {
    type: Boolean,
    default: false,
  },
  exams: [
    {
      examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exam',
      },
      examname: String,
    },
  ],
});

export default mongoose.model('user', UserSchema);
