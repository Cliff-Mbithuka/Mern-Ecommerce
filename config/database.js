require("dotenv").config({path: "./config/config.env"});
const mongoose = require('mongoose')

const connectDataBase = () => {
mongoose.connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(con => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
}).catch(e => {
    console.log(`Failed to connect: ${err}`);
})
}

module.exports = connectDataBase;