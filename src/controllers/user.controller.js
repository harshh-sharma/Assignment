import Org from "../models/organization.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const register = async (req, res) => {
  try {
    const { name, email, password, organizationName } = req.body;

    if (!name || !email || !password || !organizationName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingOrg = await Org.findOne({ name: organizationName });

    if (existingOrg) {
      return res.status(400).json({
        success: false,
        message: "Organization already exists with this name"
      });
    }


    const organization = await Org.create({
      name: organizationName
    });


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      orgId: organization._id
    });


    const token = jwt.sign(
      {
        userId: user._id,
        orgId: user.orgId,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    return res.status(201).json({
      success: true,
      message: "Organization and Admin created successfully",
      data: { user, token }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        orgId: user.orgId,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user, token }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const createMember = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email"
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const member = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      orgId: req.user.orgId 
    });

    return res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: {member}
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
