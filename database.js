const mongoose = require('mongoose');
require('dotenv').config()

exports.dbConnect = () => {
try {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Error connecting to database");
        console.error(err);
    } )
}
catch (err) {
    console.error(err, "Error in catch");
}
}