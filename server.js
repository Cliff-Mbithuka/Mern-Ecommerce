require('dotenv').config({ path: "./config/config.env" });
const app = require("./app");
const connectDataBase = require('./config/database')

connectDataBase();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
         console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
    });

    