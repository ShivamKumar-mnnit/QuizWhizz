import mongoose from "mongoose";

const ExamQuestionsSchema = new mongoose.Schema({
    examId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'exam'
    },
    questionTitle: {
        type: String,
    },
    options: [{
        option: {
            type: String,
        },
        isCorrect: {
            type: Boolean,
            default: false
        }
    }],
},
    {
        timestamps: true,
    }
)

// Use the singular form 'examquestion' for the model name
export default mongoose.model('examquestion', ExamQuestionsSchema);
