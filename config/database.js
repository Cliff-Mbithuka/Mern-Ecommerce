const mongoose = require('mongoose')




const connectDataBase = () => {
mongoose.connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(con => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
}).catch(e => {
    console.log(e);
})
}

module.exports = connectDataBase;