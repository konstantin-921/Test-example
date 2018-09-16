import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import auth from "./route/auth";
import users from "./route/users";

const app = express();

// const verifytoken = require('./services/verifytoken');

app.use(cors());
// app.use(verifytoken);
app.use(passport.initialize());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(auth);
app.use(users);

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

export default app;
