import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import * as quizcontroller from '../controllers/quizControllers.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';



/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/googleregister').post(controller.googleregister); // register user via GoogleAuth
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app
router.route('/googlelogin').post(controller.verifyUser,controller.googlelogin); // login using google in app



// Post methods - Quiz 
router.route('/questions').post(quizcontroller.insertQuestions);
router.route('/result').post(quizcontroller.storeResult)




/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/users/:userId').get(controller.getUserById) // user with userId
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables



// Get Methods - Quiz
router.route('/questions').get(quizcontroller.getQuestions); 
router.route('/result').get(quizcontroller.getResult);



/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password


// Delete Methods
router.route('/questions').delete(quizcontroller.dropQuestions);
router.route('/result').delete(quizcontroller.dropResult);
export default router;