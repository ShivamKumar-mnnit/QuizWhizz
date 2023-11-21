import Questions from "../model/Question.model.js";
import Results from "../model/Result.model.js";
import questions, {answers} from '../database/data.js';

// Get all questions
export async function getQuestions(req, res){
    try{
         const q = await Questions.find();
         res.json(q)
    }
    catch(error){
        res.json({error})
    }
}

// insert all questions
export async function insertQuestions(req, res){
    try{
         Questions.insertMany({questions, answers}, function(err, data){
            res.json({msg: "Data saved successfully"})
            // console.log({data});
         })
    }catch(error){
        res.json({error})
    }
}

// delete all questions
export async function dropQuestions(req, res){
    try{
       await Questions.deleteMany();
       res.json({msg:"Question deleted successfully"})
    }
    catch(error){
        res.json({error})
    }
}

// get all result
export async function getResult(req, res){
    try{
         const r = await Results.find()
          res.json(r)
    }
    catch(error){
        res.json({error})
    }
}

// Get result by username
export async function getResultByUsername(req, res) {
    try {
        const { username } = req.params; // Assuming username is passed as a URL parameter
        
        if (!username) {
            throw new Error('Username not provided');
        }

        const result = await Results.find({ username: username });
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



// post all results
export async function storeResult(req, res){
    try {
         const { username, result, attempts, points, achived, timetaken } = req.body;
         if(!username && !result) throw new Error('Data Not Provided...!');
 
         Results.create({ username, result, attempts, points, achived, timetaken }, function(err, data){
             res.json({ msg : "Result Saved Successfully...!"})
         })
 
    } catch (error) {
         res.json({error})
    }
 }

// delete all result 
export async function dropResult(req, res){
    try{
        await Results.deleteMany();
        res.json({msg: "Result deleted Successfully"})
    }
    catch(error){
        res.json({error})
    }
}