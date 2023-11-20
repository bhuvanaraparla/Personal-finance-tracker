const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const app = express();

app.use(express.json());
app.use(cors());

const atlasConnectionUri = "mongodb+srv://bhuvana:88hiBJq7Z.Ncf_v@cluster0.dydxoqq.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(atlasConnectionUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
