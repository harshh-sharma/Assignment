import Message from "../models/message.model.js";
import Group from "../models/group.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const { groupId } = req.params;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Message content required"
      });
    }

    const group = await Group.findOne({
      _id: groupId,
      orgId: req.user.orgId
    });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found"
      });
    }

    if (!group.members.includes(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this group"
      });
    }

    const message = await Message.create({
      content,
      sender: req.user._id,
      groupId,
      orgId: req.user.orgId
    });

    return res.status(201).json({
      success: true,
      data: {message}
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { groupId } = req.params;

    const messages = await Message.find({
      groupId,
      orgId: req.user.orgId
    })
      .populate("sender", "name email")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      data: {messages}
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

