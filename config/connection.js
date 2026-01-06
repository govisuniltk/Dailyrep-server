
const mongoose = require('mongoose')

const connectionString = process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then((res)=>{
    console.log('Database connected with DailyRepDB');

}).catch((err)=>{
    console.log('Error connecting to database',err);
})