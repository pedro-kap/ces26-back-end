const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoosePatchUpdate = require('mongoose-patch-update');
const stockController = require('./controllers/stockController');
const PORT = process.env.PORT || 80;
const cors = require('cors')
const app = express();
const morgan = require('morgan');

//Setting-up Mongoose
mongoose.plugin(mongoosePatchUpdate);
mongoose.Promise = global.Promise;

//Connecting to mongoose
mongoose.connect("mongodb+srv://db_user:OkltmzmFo5BNq5hk@cluster0.h04va.mongodb.net/Cluster0?retryWrites=true&w=majority",{
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then( connection => {
   console.log('Successfully connected to Mongodb')
}).catch( err => {
   console.log('error connecting to MongoDB');
   console.log(err);
   process.exit();
}); 

//Setting up morgan
app.use(morgan('combined'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/stock',stockController);
app.use('/',(req,res,next)=>{
   res.status(200).send("Seja bem vindo à API do exame de CES-26");
})

app.listen(PORT);
