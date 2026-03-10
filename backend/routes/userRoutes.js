import express from 'express'
import { getUserDetails, loginUser, logOut, refreshToken, registerUser } from '../controllers/userControllers.js';
import protect from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/getuserdetails',protect, getUserDetails);
userRouter.post('/logout', logOut);
userRouter.post('/refresh', refreshToken)

export default userRouter;