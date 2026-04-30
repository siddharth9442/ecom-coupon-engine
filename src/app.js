import express from 'express';
import passport from 'passport';

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false,
    limit: "20kb",
  })
);


import googleStrategy from './controllers/user/google.strategy.js';
googleStrategy(passport);
app.use(passport.initialize());

import userRouter from './controllers/user/User.route.js';
import productRouter from './controllers/product/Product.route.js';



app.use('/user', userRouter);
app.use('/product', productRouter);



export { app };