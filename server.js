const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const connectDataBase = require('./config/database')

const app = require("./app");

const PORT = process.env.PORT || 4000;
connectDataBase();

app.listen(PORT, () => {
         console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
    });

    