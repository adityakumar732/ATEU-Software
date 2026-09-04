// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors') 
// require('dotenv').config();
// require('./Models/db');
// const AuthRouter = require('./Routes/AuthRouter')
// const ProductRouter = require('./Routes/ProductRouter')
// const {connect}  =  require('mongoose')


// const PORT = process.env.PORT || 8080;
// const MONGODB_URI= process.env.MONGODB_URI

// let connectDB = async()=>{
//     await connect(MONGODB_URI)
//     console.log("connected");
    
// }
// connectDB()


// app.get('/',(req,res)=>{
//     res.send('Heloo')
// })


// app.use(bodyParser.json());
// app.use(cors())
// app.use('/auth',AuthRouter)
// app.use('/products',ProductRouter)

// app.listen(PORT,()=>{
//     console.log(`Server is running on ${PORT}`);
    
// })


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
require('./Models/db');

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
    res.send('Hello SwiftShop API');
});

// Routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on ${PORT}`)
})