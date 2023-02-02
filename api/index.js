const express = require('express');
const mongoose= require('mongoose');
const dotenv = require('dotenv');
const app =express();
const auth=require('./controllers/auth.js');
const room=require('./controllers/roomControllers.js')

dotenv.config();
//connectDB
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
    console.log('DB Connection Unsuccessfull"')
  });
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/auth',auth);
app.use('/room',room);
app.listen(5000, ()=>{
    console.log('Back end server is running!');
})