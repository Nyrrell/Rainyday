import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken'
import 'dotenv/config';

import User from "../models/User.js";

async function authRoute(fastify, options) {

  fastify.post("/register", async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
    });

    try {
      const savedUser = await newUser.save();
      res.status(201).send(savedUser);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  fastify.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(401).send("Wrong Credentials")

      const hashedPass = CryptoJS.AES.decrypt(user['password'], process.env.PASS_SEC)
      const originPassword = hashedPass.toString(CryptoJS.enc.Utf8)

      originPassword !== req.body.password && res.status(401).send("Wrong Credentials")

      const accessToken = jwt.sign({
          id: user._id,
          isAdmin: user.isAdmin
        }, process.env.JWT_SEC,
        { expiresIn: "3d" })

      const { password, ...others } = user.toJSON();

      res.status(200).send({ ...others, accessToken })
    } catch (e) {
      res.status(500).send(e);
    }
  })

}

export default authRoute;