import mongoose from "mongoose";

export const ResultSchema = new mongoose.Schema({
    username: {type: String},
    result: {type: Array, default: []},
    attempts: {type: Number, default: 0},
    points: {type: Number, default: 0},
    achived: {type: String, default: ''},
    //i will store here time in milliseconds
    timetaken: {
        type: Number, default: 0
    },
    createdAt: {type: Date, default: Date.now}
});

export default mongoose.model.Results || mongoose.model('Result', ResultSchema);