import mongoose from "mongoose";

const UserExamsSchema = new mongoose.Schema({
    examId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
    },
    userInfo: {
        username: {
            type: String,
        },
        examname: {
            type: String,
        }
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