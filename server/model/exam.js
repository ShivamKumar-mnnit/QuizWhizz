import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
  creatorUserId: {
    type: String,
    required: true,
  },
  examname: {
    type: String,
    lowercase: true,
  },
  passGrade: {
    type: Number,
    default: 2,
  },
  time: {
    type: Number,
    default: 20,
  },
},
  {
    timestamps: true,
  }
);

export default mongoose.model('exam', ExamSchema);
// export default mongoose.model.Exams || mongoose.model('exam', ExamSchema);

