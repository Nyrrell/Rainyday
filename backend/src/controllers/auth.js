import CryptoJS from 'crypto-js';
import 'dotenv/config';

import User from "../models/User.js";
import { validateEmail, validatePassword, validateUsername } from "../helpers/validation.js";

const genToken = async (user, fastify) => fastify.jwtSign({
    id: user['_id'],
    username: user['username'],
    ...(user['isAdmin'] && { isAdmin: user['isAdmin'] })
  },
  { expiresIn: "1d" }
);

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const isValidUsername = validateUsername(username);
  const isValidPassword = validatePassword(password);
  const isValidEmail = validateEmail(email);

  !(isValidUsername && isValidEmail && isValidPassword) && res.status(422).send(new Error('Informations erronées !'));

  const newUser = new User({
    username: username,
    email: email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC)
  });

  try {
    const user = await newUser.save();

    const token = await genToken(user, res)

    res.status(201).send(token);
  } catch (e) {
    if (e?.['keyPattern']?.['username']) res.status(409).send(new Error('Utilisateur déjà enregistrer !'));
    if (e?.['keyPattern']?.['email']) res.status(409).send(new Error('Email déjà enregistrer !'));
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.code(401).send(new Error('Utilisateur ou mot de passe incorrect !'));

    const hashedPass = CryptoJS.AES.decrypt(user['password'], process.env.PASS_SEC)
    const originPassword = hashedPass.toString(CryptoJS.enc.Utf8)

    originPassword !== req.body.password && res.code(401).send(new Error('Utilisateur ou mot de passe incorrect !'));

    const token = await genToken(user, res)

    res.send(token)
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const authorize = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    !user && res.code(401).send(new Error('Unauthorized access'));
    user['isAdmin']
      ? res.send({ allowAccess: true })
      : res.code(403).send(new Error('Unauthorized access'));
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};