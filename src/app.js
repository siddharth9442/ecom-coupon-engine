import express from 'express';
import passport from 'passport';

const app = express();

app.use(express.json());
app.use(express.static("public"));


import googleStrategy from './controllers/user/google.strategy.js';
googleStrategy(passport);
app.use(passport.initialize());

import userRouter from './controllers/user/User.route.js';


app.use('/user', userRouter);



export { app };