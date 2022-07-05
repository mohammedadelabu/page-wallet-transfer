import express, { Request, Response, NextFunction } from "express";
import User from "../model/userModel";
import { validateUser, validateUserLogin } from "../model/userModel";
const router = express.Router();
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { user } from "../utils/interface";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Balance from "../model/balanceModel";
import bcrypt from "bcrypt";

async function generatewalletId() {
  let randomNum = Math.floor(Math.random() * 10000000000);
  let tempNum = await Balance.find();
  let dataMatch = tempNum.find((a: any) => a.walletId == randomNum);
  while (randomNum === dataMatch) {
    randomNum = Math.floor(Math.random() * 1000000000);
    break;
  }
  return randomNum;
}

// REGISTER
const register = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const { firstName, lastName, DOB, email, phoneNumber, password } = req.body;
  try {
    const newUser = new User({
      firstName,
      lastName,
      DOB,
      email,
      password,
      phoneNumber,
    });

    const savedUser = await newUser.save();
    const userId = await User.findOne({ email }).select("_id");
    let walletId = await generatewalletId();
    const accountDetails = await Balance.create({ walletId, userId: userId["_id"] });
    res.status(StatusCodes.CREATED).json({ data: savedUser, accountDetails });
  } catch (err: any) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// LOGIN

const login = async (req: Request, res: Response) => {
  const { error } = validateUserLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(StatusCodes.UNAUTHORIZED).json("Wrong Credentials!");

    user.password !== req.body.password &&
      res.status(StatusCodes.UNAUTHORIZED).json("Wrong Credentials!");

    generateToken(user, StatusCodes.OK, res);
  } catch (err) {
    // res.status(500).json(err);
    return res.status(400).json("Invalid email or password");
  }
};

const generateToken = async (user: any, statusCode: any, res: any) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      phoneNumber: user.phoneNumber,
    },
    process.env.JWT_SEC as string,
    {
      expiresIn: "1d",
    }
  );

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + `${process.env.EXPIRE_TOKEN}`),
  };
  res
    .status(statusCode)
    .cookie("accessToken", accessToken, options)
    .json({ success: true, accessToken });
};

// LOG OUT USERS log out is get

const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("accessToken");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

export default { register, login, logout };
