import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashpassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    email,
    password: hashpassword,
    username,
  });

  try {
    await newUser.save();
    res.json({ message: "Signup sucesssful" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validuser = await User.findOne({ email });
    if (!validuser) {
      return next(errorHandler(404, "Invalid Credientials"));
    }

    const validpassword = bcryptjs.compareSync(password, validuser.password);
    if (!validpassword) {
      return next(errorHandler(400, "Invalid Credientials"));
    }
    const token = jwt.sign(
      
       { id: validuser._id},
        { expiresIn: '1h' },
      
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validuser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id },{ expiresIn: '1h' }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const greneratedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(greneratedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          is: newUser._id,
        },
        process.env.JWT_SECRET
      );

      const {password, ...rest} = newUser._doc;
      res
      .status(200)
      .cookie('access_token', token,{
      httpOnly:true,

      })
      .json(rest)

    }
  } catch (error) {
    next(error);
  }
};
