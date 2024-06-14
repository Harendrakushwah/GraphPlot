const express = require('express');
const routes = require('./Routes/getData')
const app = express();
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;


require('./Config/database').dbConnect()

app.use(express.json());
app.use(cors({origin: '*'}))

app.use('/api', routes);


app.listen(PORT, () => console.log(`App is running at ${PORT}`));