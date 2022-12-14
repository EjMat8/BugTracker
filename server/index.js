const dotenv = require("dotenv");
const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");

dotenv.config({ path: "./config.env" });
const init = async () => {
  try {
    await db.sync();
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};
init();
