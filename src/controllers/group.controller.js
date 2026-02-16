import Group from "../models/group.model.js";

export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Group name required"
      });
    }

    const group = await Group.create({
      name,
      orgId: req.user.orgId,
      createdBy: req.user._id,
      members: [req.user._id] 
    });

    return res.status(201).json({
      success: true,
      data: {group}
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      orgId: req.user.orgId,
      members: req.user._id
    });

    return res.status(200).json({
      success: true,
      data: {groups}
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const addMemberToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

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

    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    return res.status(200).json({
      success: true,
      message: "Member added successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

