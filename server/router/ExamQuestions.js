import express from 'express';
import ExamQuestions from '../model/examQuestions.js';
import Exam from '../model/exam.js';

const router = express.Router()

import Auth from '../middleware/auth.js';

//Get ExamQ(s)
router.get('/',Auth, (req, resp) => {
    ExamQuestions.find().then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})

//GET ExamQ
router.get("/:id",Auth, async (req, resp) => {
    try {
        ExamQuestions.find({ examId: req.params.id }).then(data => {
            resp.json(data)
        })
    } catch (err) {
        resp.json({ message: err });
    }
});

// router.post('/', async(req, resp) => {
//     const examQuestions = new ExamQuestions({
//         examId: req.body.examId,
//         questionTitle: req.body.questionTitle,
//         options: req.body.options,
//         correctOption: req.body.correctOption,
//     })

//     const savedExamQuestions = await  examQuestions.save();
//     await Exam.findByIdAndUpdate(req,body.examId,{
//         $push
//     })
//     examQuestions.save().then(data => {
//         resp.json(data)
//     }).catch(e => {
//         resp.json({ message: e })
//     })
// })
router.post('/',Auth, async (req, resp) => {
    try {
        const { examId, questionTitle, options, correctOption } = req.body;

        // Create a new exam question
        const newQuestion = new ExamQuestions({
            examId,
            questionTitle,
            options,
            correctOption,
        });

        // Save the question
        const savedExamQuestions = await newQuestion.save();

        // Update the corresponding exam with the new question
        await Exam.findByIdAndUpdate(
            examId,
            { $push: { examQuestions: savedExamQuestions._id } },
            { new: true }
        );

        resp.json(savedExamQuestions);
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});




router.put("/:id",Auth, (req, resp) => {
    ExamQuestions.updateOne({ _id: req.params.id }, {
        $push: {
            options: req.body.options,
        }
    }).then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})



router.patch('/:id',Auth, (req, resp) => {
    ExamQuestions.updateOne({ _id: req.params.id }, {
        $set: {
            examId: req.body.examId,
            questionTitle: req.body.questionTitle,
            options: req.body.options,
            correctOption: req.body.correctOption,
        }
    }).then(data => {
        resp.json(data)
    }).catch(e => {
        resp.json({ message: e })
    })
})

router.delete('/:id',Auth, (req, resp) => {
    ExamQuestions.deleteOne({ _id: req.params.id })
        .then(data => {
            resp.json(data)
        }).catch(e => {
            resp.json({ message: e })
        })
})

export default router;