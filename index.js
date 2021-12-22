const express = require("express");
const app = express();
const port = 3000;
app.use("/", require("./routes/send"));

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
