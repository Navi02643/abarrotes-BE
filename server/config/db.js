const mongoose = require("mongoose");

mongoose
  .connect(process.env.URL_DB, {})
  .then(() => {
    console.log("[SERVER]".green, `Database ONLINE in ${process.env.URL_DB}`);
  })
  .catch((err) => {
    console.log("[SERVER]".red, `Failed connection: ${err}`);
  });
