const User = require("../model/User");

module.exports = {
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(201).json({ message: "user deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(401).json("user does not exit");
      }

      const { password, __v, createdAt, updatedAt, ...userInfo } = user._doc;
      res.status(200).json(userInfo);
    } catch (error) {
      res.status(500).json("Something went wrong");
    }
  },
};
