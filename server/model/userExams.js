import mongoose from "mongoose";

const UserExamsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    examId:{
        type: String,
        ref:'exam'
    },
    userName: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default:"no"
    },
    examReview: [{

        qAnswers: {
            type: String,
        },
        qCorrect: {
            type: String,
        },
        qTitle: {
            type: String,
        }
    }],
},
    {
        timestamps: true,
    }
);

export default mongoose.model.UserExams || mongoose.model('userexams', UserExamsSchema);