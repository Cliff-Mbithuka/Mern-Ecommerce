const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const app = require("./app");

const connectDataBase = require('./config/database')
connectDataBase();

app.listen(process.env.PORT, () => {
         console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
    });

    