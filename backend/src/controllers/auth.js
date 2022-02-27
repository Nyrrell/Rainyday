import CryptoJS from 'crypto-js';
import 'dotenv/config';

import User from "../models/User.js";

export const register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
  });

  try {
    const user = await newUser.save();
    const { username } = user.toJSON();

    const accessToken = await res.jwtSign({
        id: user['_id'],
        isAdmin: user['isAdmin']
      },
      { expiresIn: "1d" });

    res.status(201).send({ username, accessToken });
  } catch (e) {
    if (e?.['keyPattern']?.['username']) res.status(409).send(new Error('Utilisateur déjà enregistrer !'));
    if (e?.['keyPattern']?.['email']) res.status(409).send(new Error('Email déjà enregistrer !'));
    res.send(e);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.code(401).send(new Error('Utilisateur ou mot de passe incorrect !'));

    const hashedPass = CryptoJS.AES.decrypt(user['password'], process.env.PASS_SEC)
    const originPassword = hashedPass.toString(CryptoJS.enc.Utf8)

    originPassword !== req.body.password && res.code(401).send(new Error('Utilisateur ou mot de passe incorrect !'));

    const token = await res.jwtSign({
        id: user['_id'],
        username: user['username'],
        isAdmin: user['isAdmin']
      },
      { expiresIn: "1d" });

    res.send(token)
  } catch (e) {
    res.send(e);
  }
};