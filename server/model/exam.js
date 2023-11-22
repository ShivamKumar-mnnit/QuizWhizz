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
  category:{
    type: String,
    default: "MCQ"
  },
  time: {
    type: Number,
    default: 20,
  }, 
  examQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'examquestion'
  }],
  examGivers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],

},
  {
    timestamps: true,
  }
);

export default mongoose.model('exam', ExamSchema);

