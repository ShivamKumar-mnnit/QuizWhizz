import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
  creatorUserId: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
  examQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'examquestion'
  }],

},
  {
    timestamps: true,
  }
);

export default mongoose.model('exam', ExamSchema);

