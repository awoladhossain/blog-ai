import express from "express";

const app = express();

app.listen(process.env.PORT, () => {
  console.log("hello i am running")
  console.log(`Server is running on port ${process.env.PORT}`);
});
