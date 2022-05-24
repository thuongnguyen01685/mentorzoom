const Groups = require("../models/groupModel");

const ctrlGroup = {
  createGroup: async (req, res) => {
    try {
      const { nameGroup, maZoom, ArrayUser } = req.body;
      const newGroup = await new Groups({
        nameGroup,
        maZoom,
        ArrayUser,
        user: req.user._id,
      });
      await newGroup.save();

      res.json({
        msg: "Created Group",
        newGroup: {
          ...newGroup._doc,
          user: req.user,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getGroup: async (req, res) => {
    try {
      const groups = await Groups.find({
        user: [req.user._id],
      }).sort("-createdAt");

      res.json({
        msg: "Success!",
        result: groups.length,
        groups,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateGroup: async (req, res) => {
    try {
      const { nameGroup, ArrayUser } = req.body;

      const group = await Groups.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          nameGroup,
          maZoom,
          ArrayUser,
        }
      );

      res.json({
        msg: "Updated Group !",
        newGroup: {
          ...group._doc,
          nameGroup,
          maZoom,
          ArrayUser,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = ctrlGroup;
