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
router.get("/:id",Auth, async (req, resp) => {
    try {
        Exam.find({ creatorUserId: req.user.userId}).then(data => {
            resp.json(data)
        })
    } catch (err) {
        resp.json({ message: err });
    }
});

// GET Exam by examId
router.get("/exam/:id", async (req, resp) => {
    try {
        const exam = await Exam.findOne({ _id: req.params.id });
        
        if (!exam) {
            // If no exam is found with the given ID
            return resp.status(404).json({ message: "Exam not found" });
        }

        resp.json(exam);
    } catch (err) {
        resp.status(500).json({ message: err.message });
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

router.delete('/:id', async (req, resp) => {
    try {
        // Find and delete the exam
        const deletedExam = await Exam.findByIdAndDelete(req.params.id);

        if (!deletedExam) {
            // If the exam is not found, return a 404 status
            return resp.status(404).json({ message: 'Exam not found' });
        }

        // Update the associated user's exams array
        const user = await User.findByIdAndUpdate(
            deletedExam.creatorUserId,
            { $pull: { exams: req.params.id } },
            { new: true }
        );

        // Respond with a success status
        resp.status(204).end();
    } catch (e) {
        // Handle errors and respond with an appropriate status
        resp.status(500).json({ message: e.message });
    }
});


export default router;