import 'dotenv/config';
import { connectDB } from './db/index.js';
import { app } from './app.js';

connectDB().then(() => {
    console.log("MongoDb Connected Successfully...!", new Date());
});

const port = process.env.PORT || 8001;
app.listen(port, () => {
    console.log("App is listening on: ", `http://127.0.0.1:${port}`);
});