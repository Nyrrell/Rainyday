import CryptoJS from 'crypto-js';
import 'dotenv/config';

import User from "../models/User.js";

async function authRoute(fastify, options) {

  // REGISTER
  fastify.post("/register", async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
    });

    try {
      const user = await newUser.save();
      const { username, accessToken } = user.toJSON();
      res.status(201).send({ username, accessToken });
    } catch (e) {
      res.status(500).send(e);
    }
  });

  // LOGIN
  fastify.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(401).send("Wrong Credentials")

      const hashedPass = CryptoJS.AES.decrypt(user['password'], process.env.PASS_SEC)
      const originPassword = hashedPass.toString(CryptoJS.enc.Utf8)

      originPassword !== req.body.password && res.status(401).send("Wrong Credentials")

      const accessToken = fastify.jwt.sign({
          id: user['_id'],
          isAdmin: user['isAdmin']
        },
        { expiresIn: "3d" })

      const { username, isAdmin } = user.toJSON();

      res.status(200).send({ username, accessToken, isAdmin })
    } catch (e) {
      res.status(500).send(e);
    }
  })

}

export default authRoute;