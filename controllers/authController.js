const User = require("../model/User");
const jwt = require("jsonwebtoken");
const Crypto = require("crypto-js");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      ...req.body,
      password: Crypto.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString(),
    });
    try {
      await newUser.save();

      res.status(201).json({ message: "user created successfully" });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json("no user found or provide a valid email");
      }
      const decrytPassword = Crypto.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const decryptedPass = decrytPassword.toString(Crypto.enc.Utf8);

      decryptedPass !== req.body.password &&
        res.status(401).json("wrong password");

      const userToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_KEY,
        { expiresIn: "7d" }
      );
      const { password, __v, createdAt, updatedAt, ...userInfo } = user._doc;
      res.status(200).json({ ...userInfo, token: userToken });
    } catch (error) {
      res.status(500).json("Something went wrong");
    }
  },
};
