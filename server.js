require('dotenv').config({ path: "./config/config.env" });
const app = require("./app");
const connectDataBase = require('./config/database')

//Handle Uncaught exceptions
process.on('uncaughtException', err => {
     console.log(`ERROR: ${err.stack}`);
     console.log(`Shutting down server due to uncaught exception`);
     process.exit(1)
})

connectDataBase();
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
         console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
    });

    //handle unhandled Promise rejection
    process.on('unhandledRejection', err => {
     console.log(`ERROR: ${err.stack}`);
     console.log(`Shutting down the server due to Unhandled Promise Rejections`);
     server.close(() => {
          process.exit(1)
     })
    })

    