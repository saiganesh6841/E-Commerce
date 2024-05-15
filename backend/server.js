const express = require('express');
const cors=require("cors")
require('dotenv').config();
const connectDB = require('./database/mongose'); // Corrected the typo here

connectDB(); // Call the connection function

const app = express();
app.use(express.json())
app.use(cors())

const router=require('./routes/route')
app.use(router)
// Retrieve the port from environment variables
const port = process.env.PORT;
console.log(process.env.PORT);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
