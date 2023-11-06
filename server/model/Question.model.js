import mongoose from "mongoose";

export const QuestionSchema = new mongoose.Schema({
   questions: {type: Array, default: []},
   answers: {type: Array, default: []},
   createdAt: {type: Date, default: Date.now},
});

export default mongoose.model.Questions || mongoose.model('Question', QuestionSchema);