import express from 'express';
import Exam from '../model/exam.js';
import User from '../model/User.model.js'
const router = express.Router()

import Auth from '../middleware/auth.js';

//Get Exam(s)
router.get('/', (req, resp) => {
    Exam.find().then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})

//GET Exam
router.get("/:id", async (req, resp) => {
    try {
        Exam.find({ creatorUserId: req.params.id}).then(data => {
            resp.json(data)
        })
    } catch (err) {
        resp.json({ message: err });
    }
});

//GET Exam by examId
router.get("/exam/:id", async (req, resp) => {
    try {
        Exam.find({ _id: req.params.id }).then(data => {
            resp.json(data)
        })
    } catch (err) {
        resp.json({ message: err });
    }
});


router.post('/', Auth, async (req, resp) => {
    try {
        const exam = new Exam({
            creatorUserId: req.user.userId,
            examname: req.body.examname,
            passGrade: req.body.passGrade,
            time: req.body.time,
        });

        const savedExam = await exam.save();

        // Update the user's exams array with the ID of the created exam
        await User.findByIdAndUpdate(
            req.user.userId,
            { $push: { exams: { examId: savedExam._id, examname: savedExam.examname } } },
            { new: true }
        );

        resp.json(savedExam);
    } catch (e) {
        resp.status(500).json({ message: e.message });
    }
});


router.patch('/:id', (req, resp) => {
    Exam.updateOne({ _id: req.params.id }, {
        $set: {
            examname: req.body.examname,
            passGrade: req.body.passGrade,
            time: req.body.time,
        }
    }).then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})

router.delete('/:id', (req, resp) => {
    Exam.deleteOne({ _id: req.params.id })
        .then(data => {
            resp.json(data)
        }).catch(e => {
            resp.json({ message: e })
        })
})

export default router;