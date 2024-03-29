import asyncHandler from "express-async-handler";
import User, { UserDocument } from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import { Request, Response } from "express";

/**
 * User controller class for handling user related requests and responses
 */
class UserController {
  /**
   * Login user and return user data and token if successful 
   * @static
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} - Invalid username or password
   * @throws {Error} - Invalid user data
   */
  static loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        isAdmin: user.isAdmin,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ errorMessage: "Invalid username or password" });
      throw new Error("Invalid username or password");
    }
  });

  /**
   * Register user and return user data and token if successful
   * @static
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} - Please provide all required fields
   * @throws {Error} - User already exists
   * @throws {Error} - Invalid user data
   */
  static registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { isAdmin, firstName, lastName, username, password } =
      req.body;

    if (!firstName || !lastName || !username || !password) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400).json({ errorMessage: "User already exists" });
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      isAdmin,
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({success: "User created successfully"});
    } else {
      res.status(400).json({ errorMessage: "Invalid user data" });
      throw new Error("Invalid user data");
    }
  });

  /**
   * Get user by id and return user data if successful
   * @static
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} - No user id provided
   * @throws {Error} - User not found
   */
  static getUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      res.status(400);
      throw new Error("No user id provided");
    }

    const user = await User.findById(id);

    if (user) {
      res.json({
        _id: user._id,
        isAdmin: user.isAdmin,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      });
    } else {
      res.status(404).json({ errorMessage: "User not found" });
      throw new Error("User not found");
    }
  });

  /**
   * Update user by id and return updated user data if successful
   * @static
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} - No user id provided
   * @throws {Error} - User not found
   */
  static updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ errorMessage: "No user id provided" });
      throw new Error("No user id provided");
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ errorMessage: "User not found" });
      throw new Error("User not found");
    }

    const {
      isAdmin = user.isAdmin,
      firstName = user.firstName,
      lastName = user.lastName,
      username = user.username,
      password: newPassword,
    } = req.body;

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    user.isAdmin = isAdmin;
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      isAdmin: updatedUser.isAdmin,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      username: updatedUser.username,
      // @ts-ignore - token is not a property of user
      token: generateToken(updatedUser._id.toString()),
    });
  });

  /**
   * Delete user by id and return success message if successful
   * @static
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} - No user id provided
   * @throws {Error} - User not found
   */
  static deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ errorMessage: "No user id provided" });
      throw new Error("No user id provided");
    }

    const user: UserDocument = await User.findById(id);

    if (!user) {
      res.status(404).json({ errorMessage: "User not found" });
      throw new Error("User not found");
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if(!deletedUser) throw new Error("User not found");
    res.json({ message: "User removed" });
  });

  /**
   * Get all users and return array of users if successful
   * @static
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} - No users found
   * @throws {Error} - Users not found
   */
  static getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find({}).select('-password');

    res.status(200).json(users);
});
}

export default UserController;