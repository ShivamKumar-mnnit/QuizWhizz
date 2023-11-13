import mongoose from "mongoose";

export const ExamSchema = new mongoose.Schema({
    title : {
        type: String,
        required : [true, "Please provide appropriate title"],
    },
    questype: {
        type: String,
        required: [true, "Please enter the type of question"],
    },

    questions: {type: Array, default: []},
    answers: {type: Array, default: []},

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    registereduser: {
        type: Array, default: []
    },
    
    templateurl:{ type: String},
    
    isverified : {
        type: Boolean,
        default: true
    },
}
,{
    timestamps: true
}

);

export default mongoose.model.Exams || mongoose.model('Exam', ExamSchema);