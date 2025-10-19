import { User } from "@/shared/types.js";
import bcrypt from "bcrypt";
import { ContactRepo } from "../db/fake/repo/contacts.js";
import { OTPRepo } from "../db/fake/repo/otp.js";
import { UserRepo } from "../db/fake/repo/users.js";
import { sendOTP } from "../utils/resend.js";

const AuthService = {
  signup: async (
    username: string,
    password: string,
    // email: string
  ): Promise<User> => {
    // Validate input
    // if (!username || !password || !email) {
    //   throw new Error("Username, password, and email are required");
    // }
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    // Check if user exists
    const user = UserRepo.findByUsername(username);
    if (user) {
      throw new Error("Username has already been taken");
    }

    // const emailExists = UserRepo.findByEmail(email);
    // if (emailExists) {
    //   throw new Error("Email is already in use");
    // }

    // if (password.length < 6) {
    //   throw new Error("Password is too weak");
    // }

    // Hash password by bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Make the username capitalized
    const capitalizedUsername =
      username.charAt(0).toUpperCase() + username.slice(1);

    // Add the user to repo and return it
    // const newUser = UserRepo.add(capitalizedUsername, hashedPassword, email);
    const newUser = UserRepo.add(capitalizedUsername, hashedPassword);
    ContactRepo.add(newUser);

    // Send an OTP code to the email
    // const otp = await sendOTP(email);
    // OTPRepo.add({
    //   code: otp,
    //   email,
    //   expiresAt: String(Date.now() + 60 * 1000), // 1 minute
    // });

    return newUser;
  },

  verify: async (email: string, otp: string): Promise<User> => {
    const record = await OTPRepo.findByEmail(email);
    if (!record) {
      throw new Error("No OTP found.");
    }

    if (record.expiresAt < String(Date.now())) {
      throw new Error("OTP expired.");
    }

    if (record.code !== otp) {
      throw new Error("Invalid OTP");
    }

    // Clear OTP
    await OTPRepo.delete(email);

    // verify the user in the User repo
    const user = UserRepo.verifyEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },

  signin: async (username: string, password: string): Promise<User> => {
    // Validate input
    // if (!email || !password) {
    //   throw new Error("Email and password are required");
    // }
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    // Check if user exists
    // const user = UserRepo.findByEmail(email);
    const user = UserRepo.findByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if user's email is verified
    // if (user.isVerified === false) {
    //   throw new Error("Email verification required");
    // }

    // Check if user's password is matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    return user;
  },
};

export default AuthService;
