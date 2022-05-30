const Groups = require("../models/groupModel");
const Comments = require("../models/commentModel");
const Posts = require("../models/postModel");

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
      const groups = await Groups.find().sort("-createdAt");

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
      const { nameGroup, maZoom, ArrayUser } = req.body;

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
  deleteGroup: async (req, res) => {
    try {
      const group = await Groups.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
      await Posts.deleteMany({ _id: { $in: group.posts } });
      await Comments.deleteMany({ _id: { $in: group.comments } });

      res.json({
        msg: "Deleted Groups!",
        newGroup: {
          ...group,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = ctrlGroup;
